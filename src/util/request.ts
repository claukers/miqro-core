import {Logger} from "./logger";
import {ClientRequest, IncomingHttpHeaders, IncomingMessage, OutgoingHttpHeaders, request as httpRequest} from "http";
import {format as formatUrl, parse as urlParse, UrlWithStringQuery} from "url";
import {request as httpsRequest} from "https";
import {NamedError} from "./error/named";
import {Util} from "./util";

export class ResponseError extends NamedError {
  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  constructor(
    public readonly status: number | undefined,
    public readonly response: IncomingMessage | undefined,
    public readonly headers: IncomingHttpHeaders | undefined,
    public readonly url: string,
    public readonly redirectedUrl: string | null,
    public readonly data: any,
  ) {
    super(`request ended with ${status ? `status [${status}]` : "no status"}`);
    this.name = "ResponseError";
  }
}

export interface RequestOptions {
  url: string;
  method?: string;
  socketPath?: string;
  ignoreRedirect?: boolean;
  timeout?: number;
  headers?: OutgoingHttpHeaders;
  data?: any;
}

export interface RequestResponse {
  url: string;
  redirectedUrl: string | null;
  headers: IncomingHttpHeaders,
  status: number;
  response: IncomingMessage;
  data: any;
  request: ClientRequest;
}

const requestCallback = (url: UrlWithStringQuery, options: RequestOptions, request: ClientRequest, logger: Logger) => (res: IncomingMessage): Promise<RequestResponse> => {
  return new Promise<RequestResponse>((resolve, reject) => {
    let data: any = "";
    const chunkListener = (chunk: any) => {
      data += chunk;
    };
    const errorListener = (e2: Error) => {
      res.removeListener("data", chunkListener);
      res.removeListener("end", endListener);
      reject(e2);
    };
    const endListener = () => {
      try {
        res.removeListener("data", chunkListener);
        res.removeListener("error", errorListener);
        const contentType = res.headers["content-type"];

        if (contentType && data && (contentType.indexOf("application/json") === 0 || contentType.indexOf("json") === 0)) {
          data = JSON.parse(data);
        }
        const status = res.statusCode;
        if (!status) {
          const err = new ResponseError(status, res, res.headers, options.url, null, data);
          reject(err);
        } else {

          if (status >= 300 && status <= 400 && !options.ignoreRedirect && res.headers["location"]) {
            let location = res.headers["location"];
            try {
              const loURL = urlParse(location);
              if (!loURL.hostname && url.hostname) {
                // missing hostname on redirect so same hostname protocol and port?
                loURL.hostname = url.hostname;
                loURL.port = url.port;
                loURL.path = url.path;
                loURL.protocol = url.protocol;
                location = formatUrl(loURL);
              }

              logger.debug(`redirecting to [${location}] from [${options.url}]`);
              Util.request({
                ...options,
                url: location
              }).then((ret) => {
                const redirectedUrl = ret.url;
                resolve({
                  ...ret,
                  url: options.url,
                  redirectedUrl
                });
              }).catch((e4: any) => {
                if (e4.response && e4.status && e4.headers && e4.data) {
                  const err = new ResponseError(e4.status, e4.response, e4.headers, options.url, location, e4.data);
                  err.stack = e4.stack;
                  reject(err);
                } else {
                  (e4 as any).redirectedUrl = location;
                  (e4 as any).url = options.url;
                  reject(e4);
                }
              });
            } catch (e5) {
              reject(new ResponseError(status, res, res.headers, options.url, location, data));
            }
          } else {
            if (status >= 200 && status < 300) {
              resolve({
                url: options.url,
                response: res,
                status,
                redirectedUrl: null,
                headers: res.headers,
                request,
                data
              });
            } else {
              const err = new ResponseError(status, res, res.headers, options.url, null, data);
              reject(err);
            }
          }
        }
      } catch (e) {
        logger.error(e);
        reject(e);
      }
    };

    try {
      res.on("data", chunkListener);
      res.once("error", errorListener)
      res.once("end", endListener);
    } catch (e3) {
      res.removeListener("data", chunkListener);
      res.removeListener("end", endListener);
      res.removeListener("error", errorListener);
      reject(e3);
    }
  });

}

export const request = (options: RequestOptions, logger: Logger = Util.logger): Promise<RequestResponse> => {
  if (options.method?.toLowerCase() === "get" && options.data !== undefined) {
    return Promise.reject(new Error("cannot send data on method get"));
  } else {
    return new Promise((resolve, reject) => {
      try {
        const isJSON: boolean = typeof options.data !== "string";
        if (isJSON &&
          ((options.headers && (options.headers["Content-Type"] === undefined) && options.headers["content-type"] === undefined) ||
            !options.headers)
        ) {
          if (!options.headers) {
            options.headers = {};
          }
          options.headers["Content-Type"] = "application/json;charset=utf-8";
        } else if (
          !isJSON &&
          ((options.headers && (options.headers["Content-Type"] === undefined) && options.headers["content-type"] === undefined) ||
            !options.headers)
        ) {
          if (!options.headers) {
            options.headers = {};
          }
          options.headers["Content-Type"] = "plain/text;charset=utf-8";
        }
        const data = options.data ? !isJSON ? options.data : JSON.stringify(options.data) : undefined;
        const contentLength = data ? data.length : 0;
        const url = urlParse(options.url);
        if (url.protocol === null) {
          url.protocol = "http:";
        }
        switch (url.protocol) {
          case "https:":
          case "http:":
            const requestModule = (url.protocol === "https:" ? httpsRequest : httpRequest);
            const req: ClientRequest = requestModule({
              agent: false,
              path: url.path,
              method: options.method,
              socketPath: options.socketPath,
              headers: {
                ["User-Agent"]: "curl",
                ...options.headers,
                ["Content-Length"]: contentLength
              },
              timeout: options.timeout,
              hostname: url.hostname,
              port: url.port
            }, (res: IncomingMessage) => {
              try {
                requestCallback(url, options, req, logger)(res).then((response) => {
                  resolve(response);
                }).catch((e) => {
                  reject(e);
                });
              } catch (e) {
                reject(e);
              }
            });
            req.once("error", (e: Error) => {
              if ((e as any).code === "ECONNREFUSED") {
                e.name = "ResponseConnectionRefusedError";
              }
              reject(e);
            });
            req.end(data);
            break;
          default:
            reject(new Error(`unknown protocol [${url.protocol}]`))
        }
      } catch (e) {
        reject(e);
      }
    });
  }
}

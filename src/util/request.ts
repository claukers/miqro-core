import {Logger} from "./logger";
import http from "http";
import {parse as urlParse, UrlWithStringQuery, format as urlFormat} from "url";
import https from "https";
import {Util} from "./util";
import {RequestOptions, RequestResponse, ResponseError} from "./request_common";
import {gunzipSync} from "zlib";
import {parse as parseQuery, stringify as stringifyQuery} from "querystring";

const DEFAULT_USER_AGENT = "curl/7.69.1";
const CONTENT_TYPE_HEADER = "Content-Type";
const JSON_TYPE = "application/json;charset=utf-8";
const TEXT_TYPE = "plain/text;charset=utf-8";

export const request = (options: RequestOptions, logger: Logger = Util.logger): Promise<RequestResponse> => {
  if (options.method?.toLowerCase() === "get" && options.data !== undefined) {
    return Promise.reject(new Error("cannot send data on method get"));
  } else {
    return new Promise((resolve, reject) => {
      try {
        if (!options.headers) {
          options.headers = {};
        }
        const isJSON: boolean = typeof options.data !== "string";

        const noType = (options.headers[CONTENT_TYPE_HEADER] === undefined && options.headers[CONTENT_TYPE_HEADER.toLowerCase()] === undefined && options.headers[CONTENT_TYPE_HEADER.toUpperCase()] === undefined);
        if (isJSON && options.data && noType) {
          options.headers["Content-Type"] = JSON_TYPE;
        } else if (!isJSON && options.data && noType) {
          options.headers["Content-Type"] = TEXT_TYPE;
        }
        const data = options.data ? !isJSON ? options.data : JSON.stringify(options.data) : undefined;
        const contentLength = data ? data.length : 0;
        const urlO: UrlWithStringQuery = urlParse(options.url);
        if (urlO.protocol === null) {
          urlO.protocol = "http:";
        }
        switch (urlO.protocol) {
          case "https:":
          case "http:":
            const requestModule = (urlO.protocol === "https:" ? https.request : http.request);
            const queryStr = stringifyQuery(urlO.query ? {
              ...options.query,
              ...parseQuery(urlO.query)
            } : {
              ...options.query
            });
            const req: http.ClientRequest = requestModule({
              agent: false,
              path: `${urlO.pathname}${queryStr ? `?${queryStr}` : ""}${urlO.hash ? urlO.hash : ""}`,
              method: options.method,
              socketPath: options.socketPath,
              headers: {
                ["User-Agent"]: DEFAULT_USER_AGENT,
                ...options.headers,
                ["Content-Length"]: contentLength
              },
              timeout: options.timeout,
              hostname: urlO.hostname,
              port: urlO.port
            }, (res: http.IncomingMessage) => {
              try {
                requestCallback(urlO, options, req, logger)(res).then((response) => {
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
            reject(new Error(`unknown protocol [${urlO.protocol}]`))
        }
      } catch (e) {
        reject(e);
      }
    });
  }
}

const requestCallback = (urlO: UrlWithStringQuery, options: RequestOptions, req: http.ClientRequest, logger: Logger) => (res: http.IncomingMessage): Promise<RequestResponse> => {
  return new Promise<RequestResponse>((resolve, reject) => {
    const buffers: Buffer[] = [];
    const chunkListener = (chunk: Buffer) => {
      buffers.push(chunk);
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

        const responseBuffer: Buffer = res.headers["content-encoding"] === "gzip" ?
          gunzipSync(Buffer.concat(buffers)) : Buffer.concat(buffers);
        let data: any = responseBuffer.toString();

        const contentType = res.headers["content-type"];
        if (contentType && data && (contentType.indexOf("json") !== -1)) {
          data = JSON.parse(responseBuffer.toString());
        }

        const status = res.statusCode;
        if (!status) {
          const err = new ResponseError(status, res, res.headers, options.url, null, data, responseBuffer);
          reject(err);
        } else {
          if (status >= 300 && status <= 400 && !options.ignoreRedirect && res.headers["location"]) {
            let location = res.headers["location"];
            try {
              const loURL = urlParse(location);
              if (!loURL.hostname && urlO.hostname) {
                // missing hostname on redirect so same hostname protocol and port?
                loURL.hostname = urlO.hostname;
                loURL.port = urlO.port;
                loURL.path = urlO.path;
                loURL.protocol = urlO.protocol;
                location = urlFormat(loURL);
              }

              logger.debug(`redirecting to [${location}] from [${options.url}]`);
              request({
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
                  const err = new ResponseError(e4.status, e4.response, e4.headers, options.url, location, e4.data, responseBuffer);
                  err.stack = e4.stack;
                  reject(err);
                } else {
                  (e4 as any).redirectedUrl = location;
                  (e4 as any).url = options.url;
                  reject(e4);
                }
              });
            } catch (e5) {
              reject(new ResponseError(status, res, res.headers, options.url, location, data, responseBuffer));
            }
          } else {
            if (status >= 200 && status < 300) {
              resolve({
                url: options.url,
                response: res,
                status,
                redirectedUrl: null,
                headers: res.headers,
                request: req,
                data,
                buffer: responseBuffer
              });
            } else {
              const err = new ResponseError(status, res, res.headers, options.url, null, data, responseBuffer);
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

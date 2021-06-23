import { getLogger, Logger } from "./logger";
import http from "http";
import https from "https";
import { parseRedirectLocation, RequestOptions, RequestResponse, ResponseError } from "./request_common";
import { gunzipSync } from "zlib";

const DEFAULT_USER_AGENT = "curl/7.69.1";
const CONTENT_TYPE_HEADER = "Content-Type";
const JSON_TYPE = "application/json;charset=utf-8";
const TEXT_TYPE = "plain/text;charset=utf-8";

export const request = (options: RequestOptions, l?: Logger): Promise<RequestResponse> => {
  const logger = l ? l : getLogger("request");
  if (options.method?.toLowerCase() === "get" && options.data !== undefined) {
    return Promise.reject(new Error("cannot send data on method get"));
  } else {
    return new Promise((resolve, reject) => {
      try {
        if (!options.headers) {
          options.headers = {};
        }
        if (!options.maxRedirects) {
          options.maxRedirects = 10;
        }
        const isJSON: boolean = typeof options.data !== "string";

        const noType = (options.headers[CONTENT_TYPE_HEADER] === undefined && options.headers[CONTENT_TYPE_HEADER.toLowerCase()] === undefined && options.headers[CONTENT_TYPE_HEADER.toUpperCase()] === undefined);
        if (isJSON && options.data && noType) {
          options.headers["Content-Type"] = JSON_TYPE;
        } else if (!isJSON && options.data && noType) {
          options.headers["Content-Type"] = TEXT_TYPE;
        }
        const data = options.data ? !isJSON ? options.data : JSON.stringify(options.data) : undefined;
        const contentLength = data ? Buffer.from(data).length : 0;

        const { protocol, queryStr, hash, pathname, hostname, port } = parseRedirectLocation(options.url, options.query, options.socketPath);

        switch (protocol) {
          case "https:":
          case "http:":
            const req: http.ClientRequest = (protocol === "https:" ? https.request : http.request)({
              agent: false,
              path: `${pathname}${queryStr ? `?${queryStr}` : ""}${hash ? hash : ""}`,
              method: options.method,
              socketPath: options.socketPath,
              headers: options.disableUserAgent ? {
                ...options.headers,
                ["Content-Length"]: contentLength
              } : {
                ["User-Agent"]: DEFAULT_USER_AGENT,
                ...options.headers,
                ["Content-Length"]: contentLength
              },
              timeout: options.timeout,
              hostname,
              port
            }, (res: http.IncomingMessage) => {
              try {
                const buffers: Buffer[] = [];
                let responseLength: number = 0;
                const chunkListener = (chunk: Buffer) => {
                  responseLength += chunk.length;
                  if (options.maxResponse && options.maxResponse < responseLength) {
                    res.removeListener("data", chunkListener);
                    res.removeListener("error", errorListener)
                    res.removeListener("end", endListener);
                    req.end(() => {
                      reject(new Error(`response too big maxResponse ${options.maxResponse} < ${responseLength}`));
                      return;
                    });
                  } else {
                    buffers.push(chunk);
                  }
                };
                const errorListener = (e2: Error) => {
                  res.removeListener("data", chunkListener);
                  res.removeListener("end", endListener);
                  res.removeListener("error", errorListener)
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
                      const err = new ResponseError(status as any, res.headers, options.url, null, data, responseBuffer, options.locations ? options.locations : []);
                      reject(err);
                      return;
                    } else if (status >= 300 && status <= 400 && options.followRedirect && res.headers["location"]) {
                      const location = res.headers["location"];
                      try {
                        const locationData = parseRedirectLocation(location, options.query, options.socketPath);

                        if (!locationData.hostname && hostname && !locationData.socketPath) {
                          locationData.url = `${protocol}//${hostname}${port ? `:${port}` : ""}${locationData.url}`;
                        }

                        logger.debug(`redirecting to [${locationData.url}] from [${options.url}][${status}]`);

                        if (options.url === locationData.url) {
                          reject(new Error(`bad redirect to [${location}] from [${options.url}][${status}]`));
                          return;
                        }
                        if (options.locations !== undefined && options.maxRedirects !== undefined && options.locations.length > options.maxRedirects) {
                          reject(new Error(`too many redirects to [${location}] from [${options.url}][${status}]`));
                          return;
                        }
                        if (options.locations && options.locations.indexOf(locationData.url) !== -1) {
                          reject(new Error(`loop redirect to [${location}] from [${options.url}][${status}]`));
                          return;
                        }

                        options.locations = options.locations ? options.locations.concat([locationData.url]) : [options.url, locationData.url];
                        request({
                          ...options,
                          socketPath: locationData.socketPath,
                          url: locationData.url,
                          locations: options.locations
                        }, logger).then((ret) => {
                          const redirectedUrl = ret.url;
                          resolve({
                            ...ret,
                            url: options.url,
                            redirectedUrl
                          });
                          return;
                        }).catch((e4: any) => {
                          if (e4.response && e4.status && e4.headers && e4.data) {
                            const err = new ResponseError(e4.status, e4.headers, options.url, locationData.url, e4.data, responseBuffer, options.locations ? options.locations : []);
                            err.stack = e4.stack;
                            reject(err);
                            return;
                          } else {
                            (e4 as any).redirectedUrl = locationData.url;
                            (e4 as any).locations = options.locations;
                            (e4 as any).url = options.url;
                            reject(e4);
                            return;
                          }
                        });
                      } catch (e5) {
                        reject(new ResponseError(status, res.headers, options.url, location, data, responseBuffer, options.locations ? options.locations : []));
                        return;
                      }
                    } else if (status >= 200 && status < 300) {
                      resolve({
                        url: options.url,
                        status,
                        locations: options.locations ? options.locations : [],
                        redirectedUrl: null,
                        headers: res.headers,
                        data,
                        buffer: responseBuffer
                      });
                      return;
                    } else {
                      const err = new ResponseError(status, res.headers, options.url, null, data, responseBuffer, options.locations ? options.locations : []);
                      reject(err);
                      return;
                    }

                  } catch (e) {
                    reject(e);
                    return;
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
                  return;
                }
              } catch (e) {
                reject(e);
                return;
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
            reject(new Error(`unknown protocol [${protocol}]`))
        }
      } catch (e) {
        reject(e);
      }
    });
  }
}

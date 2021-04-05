import { request, RequestOptions, RequestResponse, ResponseError } from "./util";
import { App } from "./app";
import { existsSync, unlinkSync } from "fs";
import { createServer } from "http";

export const TestHelper = async (app: App, options: RequestOptions, cb?: (response: RequestResponse) => void): Promise<RequestResponse | void> => {
  const unixSocket = `/tmp/socket.test.helper${Date.now()}`;
  if (existsSync(unixSocket)) {
    unlinkSync(unixSocket);
  }
  const server = createServer(app.listener);
  return new Promise<RequestResponse | void>((resolve, reject) => {
    server.listen(unixSocket, () => {
      request({
        ...options,
        socketPath: unixSocket
      }).then((response) => {
        server.close(() => {
          if (cb) {
            try {
              cb(response);
            } catch (ee) {
              reject(ee);
            }
          }
          resolve(response);
        });
      }).catch((e: ResponseError) => {
        server.close(() => {
          if (cb) {
            try {
              cb(e as any);
            } catch (ee) {
              reject(ee);
            }
            resolve();
          } else {
            reject(e);
          }
        });
      });
    });
  });
}

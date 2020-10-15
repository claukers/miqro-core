import http from "http";
import {NamedError} from "./error/named";

export class ResponseError extends NamedError {
  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  constructor(
    public readonly status: number | undefined,
    public readonly response: http.IncomingMessage | undefined,
    public readonly headers: http.IncomingHttpHeaders | undefined,
    public readonly url: string,
    public readonly redirectedUrl: string | null,
    public readonly data: any,
    public readonly buffer: Buffer,
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
  headers?: http.OutgoingHttpHeaders;
  data?: any;
}

export interface RequestResponse {
  url: string;
  redirectedUrl: string | null;
  headers: http.IncomingHttpHeaders,
  status: number;
  response: http.IncomingMessage;
  data: any;
  buffer: Buffer;
  request: http.ClientRequest;
}



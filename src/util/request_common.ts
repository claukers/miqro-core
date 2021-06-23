import http from "http";
import { NamedError } from "./error/named";
import { parse as parseQuery, ParsedUrlQueryInput, stringify as stringifyQuery } from "querystring";
import { URL } from "url";

export const parseRedirectLocation = (url: string, extraQuery?: ParsedUrlQueryInput, socketPath?: string): {
  protocol?: string;
  queryStr: string;
  pathname: string;
  hash: string;
  hostname?: string;
  socketPath?: string;
  port?: string;
  url: string;
} => {
  const ret = (urlO: URL, url: string, ignoreHostPort?: boolean) => {
    return {
      queryStr: stringifyQuery(urlO.search ? {
        ...extraQuery,
        ...parseQuery(urlO.search.substring(1))
      } : {
        ...extraQuery
      }),
      protocol: ignoreHostPort ? "http:" : urlO.protocol,
      hash: urlO.hash,
      pathname: urlO.pathname,
      socketPath: ignoreHostPort ? socketPath : undefined,
      hostname: ignoreHostPort ? undefined : urlO.hostname,
      port: ignoreHostPort ? undefined : urlO.port,
      url: ignoreHostPort ? url : urlO.toString()
    };
  }
  try {
    return ret(new URL(url), url);
  } catch (eU) {
    if (url && url.length > 0 && url[0] === "/") {
      return ret(new URL(`http://localhost${url}`), url, true);
    } else {
      throw eU;
    }
  }
}

export class ResponseError extends NamedError implements RequestResponse {
  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  constructor(
    public readonly status: number,
    public readonly headers: http.IncomingHttpHeaders,
    public readonly url: string,
    public readonly redirectedUrl: string | null,
    public readonly data: any,
    public readonly buffer: Buffer,
    public readonly locations: string[]
  ) {
    super(`request ended with ${status ? `status [${status}]` : "no status"}`);
    this.name = "ResponseError";
  }
}

export interface RequestOptions {
  url: string;
  method?: string;
  query?: ParsedUrlQueryInput;
  socketPath?: string;
  followRedirect?: boolean;
  disableUserAgent?: true;
  maxRedirects?: number;
  maxResponse?: number;
  locations?: string[];
  timeout?: number;
  headers?: http.OutgoingHttpHeaders;
  data?: any;
}

export interface RequestResponse {
  url: string;
  redirectedUrl: string | null;
  locations: string[];
  headers: http.IncomingHttpHeaders,
  status: number;
  data: any;
  buffer: Buffer;
}



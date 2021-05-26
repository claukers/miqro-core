import { defaultLoggerFormatter, getLogger, Logger, Map, Session, SimpleMap } from "../../util";
import { IncomingHttpHeaders, IncomingMessage, OutgoingHttpHeaders, ServerResponse } from "http";
import { ParsedUrlQuery, parse as queryParse } from "querystring";
import { URL } from "url";
import { Response } from "./response";

// adds "/" to the final of path 
// cannot account for query or hash params so send only new URL().pathname 
export const normalizePath = (path: string): string => {
  if (typeof path !== "string") {
    throw new Error("path not string");
  }
  if (path.length > 1) {
    if (path.charAt(0) !== "/") {
      throw new Error("path doesnt start with /");
    }
    if (path[path.length - 1] !== "/") {
      return `${path}/`;
    } else {
      return path; // already normalized
    }
  } else if (path !== "/") {
    throw new Error("path of length 1 not /");
  } else {
    return path; // "/"
  }
}

export class Context {
  public readonly logger: Logger;
  public readonly startMS: number;
  public tookMS?: number;
  public uuid: string; // a middleware will fill this
  public session?: Session;
  public results: any[];
  public readonly path: string;
  public readonly url: string;
  public readonly hash: string;
  public readonly method: string;
  public readonly headers: IncomingHttpHeaders;
  public readonly cookies: SimpleMap<string>;
  public query: ParsedUrlQuery;
  public params: Map<string | undefined> = {}; // the router will fill this
  public buffer: Buffer; // empty buffer. middleware must read it
  public readonly remoteAddress?: string;
  public body: any; // a middleware will fill this reading the buffer
  constructor(public readonly req: IncomingMessage, public readonly res: ServerResponse) {
    this.body = undefined as any;
    const url = new URL(`http://localhost${req.url}`);
    this.url = req.url as string;
    this.method = req.method as string;
    this.path = normalizePath(url.pathname);
    this.hash = url.hash;
    this.query = {
      ...queryParse(url.searchParams.toString())
    };
    this.buffer = Buffer.from("");
    this.remoteAddress = req.socket.remoteAddress;
    this.cookies = {}; // a middleware will fill
    this.headers = req.headers;
    this.startMS = Date.now();
    this.uuid = undefined as any; //v4();
    this.results = []; // handlers will fill this
    const pathToEnv = this.path.replace(/\//ig, "_").toUpperCase();
    const identifier = `${pathToEnv === "_" ? "" : pathToEnv.substring(1)}${this.method.toUpperCase()}`;
    this.logger = getLogger(identifier, {
      formatter: ({
        identifier,
        level,
        message,
      }) => defaultLoggerFormatter({
        identifier,
        level,
        message: `${this.method} ${this.url}${this.uuid ? ` [${this.uuid}]` : ""}${this.remoteAddress ? ` (${this.remoteAddress})` : ""}${this.session ?
          ` session[${this.session.username}:${this.session.account}]` :
          ""
          } ${message}`
      })
    }, false);
  }
  public setHeader(name: string, value: number | string | ReadonlyArray<string>): void {
    return this.res.setHeader(name, value);
  }
  public async end({ status, headers, body }: Response): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.res.statusCode = status;
        const keys = Object.keys(headers);
        for (const key of keys) {
          if (headers[key] !== undefined) {
            this.res.setHeader(key, headers[key] as any);
          }
        }
        this.res.end(String(body), () => {
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public async json(body: any, headers?: OutgoingHttpHeaders, status?: number): Promise<void> {
    return this.end({
      status: status !== undefined ? status : 200,
      headers: {
        ...headers,
        ['Content-Type']: 'application/json; charset=utf-8'
      },
      body: JSON.stringify(body)
    })
  }
  public async text(text: string, headers?: OutgoingHttpHeaders, status?: number): Promise<void> {
    return this.end({
      status: status !== undefined ? status : 200,
      headers: {
        ...headers,
        ['Content-Type']: 'plain/text; charset=utf-8'
      },
      body: text
    });
  }
  public async html(html: string, headers?: OutgoingHttpHeaders, status?: number): Promise<void> {
    return this.end({
      status: status !== undefined ? status : 200,
      headers: {
        ...headers,
        ['Content-Type']: 'text/html; charset=utf-8',
      },
      body: html
    })
  }
  public async redirect(url: string, headers?: OutgoingHttpHeaders, status?: number): Promise<void> {
    return this.end({
      status: status !== undefined ? status : 302,
      headers: {
        ...headers,
        ['Location']: url
      }
    })
  }
}

export interface PathToken {
  optional: boolean;
  wild: boolean;
  token: string;
}

export const tokenizePath = (path?: string): PathToken[] => {
  if (path === undefined) {
    return [];
  }
  const tokens = path.split("/").filter(p => p).map(token => {
    const wild = token[0] === ":";
    const optional = token[token.length - 1] === "?";
    return {
      optional,
      wild,
      token
    }
  });
  tokens.forEach((token, i) => token.optional)
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].optional && i != tokens.length - 1) {
      throw new Error("cannot set a path token as optional that's not the last one");
    }
  }
  return tokens;
}

export const matchTokenizePath = (checkOnlyTokens: boolean, tokens: PathToken[], ctx: Context, prePath?: string): {
  match: boolean;
  params: Map<string | undefined>
} => {
  if (prePath !== "/" && prePath !== undefined) {
    tokens = (prePath.split("/").filter(p => p).map(s => {
      return {
        optional: false,
        token: s,
        wild: false
      };
    }) as PathToken[]).concat(tokens);
  }

  const ctxTokens = ctx.path.split("/").filter(p => p);
  const lastTokenIsOptional = tokens[tokens.length - 1].optional;
  const couldBeUsingOptional = (lastTokenIsOptional &&
    (
      (!checkOnlyTokens && tokens.length - 1 === ctxTokens.length) ||
      (checkOnlyTokens && tokens.length - 1 <= ctxTokens.length)
    )
  );

  const params: Map<string | undefined> = {};

  if ((!checkOnlyTokens && tokens.length === ctxTokens.length) || couldBeUsingOptional || (checkOnlyTokens && tokens.length <= ctxTokens.length)) {
    // similiar count of tokens
    for (let i = 0; i < ctxTokens.length; i++) {
      const ctxToken = ctxTokens[i];
      if (checkOnlyTokens && i >= tokens.length) {
        break;
      }

      if (i < ctxTokens.length - 1 || (i === ctxTokens.length - 1 && !couldBeUsingOptional)) {
        // check
        if (tokens[i].wild || ctxToken.toLocaleLowerCase() === tokens[i].token.toLocaleLowerCase()) {
          // check pass
          if (tokens[i].wild) {
            const paramKey = tokens[i].token.substring(1, tokens[i].token.length - (tokens[i].optional ? 1 : 0));
            params[paramKey] = ctxToken;
          }
          continue;
        }
      }
      return {
        match: false,
        params: {}
      };
    }
    return {
      match: true,
      params
    };
  } else {
    return {
      match: false,
      params: {}
    };
  }
}

import {inspect} from "util";
import {Logger, SimpleMap, Util} from "../util";
import {IncomingMessage, ServerResponse} from "http";

export interface VerifyTokenService {
  verify(args: { token: string }): Promise<Session>;
}

export interface NoTokenSession {
  account: string;
  username: string;
  groups: string[];
}

export interface Session extends NoTokenSession {
  token: string;
}

export interface Request extends IncomingMessage {
  results: any[];
  session?: Session;
  uuid?: string;
  query?: SimpleMap<string>;
  params?: SimpleMap<string>;
  body?: any;
}

export const initRequest = (req: IncomingMessage): Request => {
  (req as any).results = (req as any).results ? (req as any).results : [];
  (req as any).session = (req as any).session ? (req as any).session : null;
  (req as any).uuid = (req as any).uuid ? (req as any).uuid : null;
  (req as any).query = (req as any).query ? (req as any).query : {};
  (req as any).params = (req as any).params ? (req as any).params : {};
  (req as any).body = (req as any).body ? (req as any).body : null;
  return req as Request;
}

export type NextFunction = (e?: any) => void;

export type ErrorCallback<T = IncomingMessage> = (err: Error, req: T, res: ServerResponse, next: NextFunction) => any;
export type Callback<T = IncomingMessage> = (req: T, res: ServerResponse) => any | void;
export type AsyncCallback<T = IncomingMessage> = (req: T, res: ServerResponse) => Promise<any | void>;
export type NextCallback<T = IncomingMessage> = (req: T, res: ServerResponse, next: NextFunction) => void;
export type AsyncNextCallback<T = IncomingMessage> = (req: T, res: ServerResponse, next: NextFunction) => Promise<void>;

/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
export const setResults = (req: IncomingMessage, results: any[]): void => {
  (req as Request).results = results;
};

/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
export const getResults = (req: IncomingMessage): any[] => {
  if (!((req as Request).results)) {
    setResults(req, []);
  }
  return (req as Request).results;
};

/**
 * Wraps an async express request handler but catches the return value and appends it to req.results
 *
 * @param fn  express request handler ´async function´.
 * @param logger  [OPTIONAL] logger for logging errors ´ILogger´.
 */
export const Handler = (fn: AsyncCallback<Request> | Callback<Request>, logger?: Logger): NextCallback => {
  if (!logger) {
    logger = Util.getLogger("Handler");
  }
  return (reqArgs, res, next) => {
    let handleError = (err: Error) => {
      logger.error(err);
      handleError = null;
      next(err);
    }
    try {
      const req = initRequest(reqArgs);
      let handleResult = (result) => {
        if (typeof result !== "undefined") {
          logger.debug(`request[${req.uuid}] push to results[${inspect(result)}]`);
          getResults(req).push(result);
        } else {
          logger.debug(`request[${req.uuid}] ignoring undefined result`);
        }
        next();
        handleResult = null;
      }
      const p = fn(req, res);
      if (p instanceof Promise) {
        p.then(handleResult).catch(handleError);
      } else {
        handleResult(p);
      }
    } catch (e) {
      handleError(e);
    }
  };
};


export interface HandleAllOptionsOutput {
  req: Request,
  handlers: AsyncNextCallback[]
}

export type HandleAllOptions = (req: Request) => Promise<HandleAllOptionsOutput[]>;

export const HandleAll = (generator: HandleAllOptions, logger?: Logger): NextCallback => {
  if (!logger) {
    logger = Util.getLogger("HandleAll");
  }
  return Handler(async (req) => {
    return Promise.all((await generator(req)).map((call) => {
      return new Promise((resolve, reject) => {
        const toCall = call.handlers.reverse();
        const nextCaller = () => {
          const handler = toCall.pop();
          if (!handler) {
            resolve(getResults(call.req))
          } else {
            handler(call.req, null, (e?: Error) => {
              if (e) {
                reject(e);
              } else {
                setTimeout(nextCaller, 0);
              }
            });
          }
        };
        setTimeout(nextCaller, 0);
      })
    }));
  }, logger);
};

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

/* eslint-disable  @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    // tslint:disable-next-line:interface-name
    interface Request extends IncomingMessage {
      results: any[];
      session?: Session;
      uuid?: string;
      query: SimpleMap<string>;
      params: SimpleMap<string>;
      body: any;
    }
  }
}

export type NextFunction = (e?: any) => void;

export type ErrorCallback = (err: Error, req: Express.Request, res: ServerResponse, next: NextFunction) => any;
export type Callback = (req: Express.Request, res: ServerResponse) => any;
export type AsyncCallback = (req: Express.Request, res: ServerResponse) => Promise<any>;
export type NextCallback = (req: Express.Request, res: ServerResponse, next: NextFunction) => void;
export type AsyncNextCallback = (req: Express.Request, res: ServerResponse, next: NextFunction) => Promise<void>;

/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
export const setResults = (req: Express.Request, results: any[]): void => {
  req.results = results;
};

/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
export const getResults = (req: Express.Request): any[] => {
  if (!(req.results)) {
    setResults(req, []);
  }
  return req.results;
};

/**
 * Wraps an async express request handler but catches the return value and appends it to req.results
 *
 * @param fn  express request handler ´async function´.
 * @param logger  [OPTIONAL] logger for logging errors ´ILogger´.
 */
export const Handler = (fn: AsyncCallback | Callback, logger?: Logger): NextCallback => {
  if (!logger) {
    logger = Util.getLogger("Handler");
  }
  return (req, res, next) => {
    try {
      const p = fn(req, res);
      if (p instanceof Promise) {
        p.then((result) => {
          logger.debug(`request[${req.uuid}] push to results[${inspect(result)}]`);
          getResults(req).push(result);
          next();
        }).catch((e) => {
          logger.error(e);
          next(e);
        });
      } else {
        logger.debug(`request[${req.uuid}] push to results[${inspect(p)}]`);
        getResults(req).push(p);
        next();
      }
    } catch (e) {
      logger.error(e);
      next(e);
    }
  };
};


export interface HandleAllOptionsOutput {
  req: any,
  handlers: AsyncNextCallback[]
}

export type HandleAllOptions = (req: any) => Promise<HandleAllOptionsOutput[]>;

export const HandleAll = (generator: HandleAllOptions, logger?: Logger): NextCallback => {
  if (!logger) {
    logger = Util.getLogger("HandleAll");
  }
  return Handler(async (req: any) => {
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

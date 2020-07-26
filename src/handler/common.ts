import {inspect} from "util";
import {Logger, SimpleMap, Util} from "../util";

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
    interface Request {
      results: any[];
      session?: Session;
      uuid: string;
      query: SimpleMap<string>;
      params: SimpleMap<string>;
      headers: SimpleMap<string>;
      body: any;
    }
  }
}

export type NextFunction = (e?: Error) => void;

export type IErrorHandlerCallback = (err: Error, req: Express.Request, res: any, next: NextFunction) => Promise<any>;
export type IHandlerCallback = (req: Express.Request, res: any) => Promise<any>;
export type ICallback = (req: Express.Request, res: any) => any;
export type INextCallback = (req: Express.Request, res: any, next: NextFunction) => any;
export type INextHandlerCallback = (req: Express.Request, res: any, next: NextFunction) => Promise<any>;

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
 * Wraps an async express request handler that when the function throws it is correctly handled by calling the next function
 *
 * @param fn  express request handler ´async function´.
 * @param logger  [OPTIONAL] logger for logging errors ´ILogger´.
 */
export const NextErrorHandler = (fn: INextHandlerCallback, logger?: Logger): INextHandlerCallback => {
  if (!logger) {
    logger = Util.getLogger("NextErrorHandler");
  }
  return async (req, res, next): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (e) {
      logger.error(`request[${req.uuid}] ${inspect(e)}`);
      next(e);
    }
  };
};

/**
 * Wraps an async express request handler but catches the return value and appends it to req.results
 *
 * @param fn  express request handler ´async function´.
 * @param logger  [OPTIONAL] logger for logging errors ´ILogger´.
 */
export const Handler = (fn: IHandlerCallback, logger?: Logger): INextHandlerCallback => {
  if (!logger) {
    logger = Util.getLogger("Handler");
  }
  return NextErrorHandler(async (req, res, next) => {
    const result = await fn(req, res);
    logger.debug(`request[${req.uuid}] push to results[${inspect(result)}]`);
    getResults(req).push(result);
    next();
  }, logger);
};


export interface HandleAllOptionsOutput {
  req: any,
  handlers: INextHandlerCallback[]
}

export type HandleAllOptions = (req: any) => Promise<HandleAllOptionsOutput[]>;

export const HandleAll = (generator: HandleAllOptions, logger?: Logger): INextHandlerCallback => {
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

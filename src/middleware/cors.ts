import { BadRequestError, Context, Handler } from "../handler";
import { checkEnvVariables } from "../util";

export const DEFAULT_CORS_ORIGINS = "*";
export const DEFAULT_CORS_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
export const DEFAULT_CORS_PREFLIGHT_CONTINUE = false;

export interface CORSOptions {
  origins: string[] | string | undefined;
  methods?: string;
  preflightContinue?: boolean;
}

export const CORS = (options?: CORSOptions): Handler<void> => {
  let origins: string[] | undefined | string;
  let methods: string;
  let preFlightContinue = false;
  if (options) {
    origins = options.origins instanceof Array ? options.origins : (options.origins ? [options.origins] : undefined);
    methods = options.methods ? options.methods : DEFAULT_CORS_METHODS;
    preFlightContinue = options.preflightContinue ? true : false;
  } else {
    const [originsS, preFlightContinueS, methodsS] =
      checkEnvVariables(["CORS_ORIGINS", "CORS_PREFLIGHT_CONTINUE", "CORS_METHODS"], [DEFAULT_CORS_ORIGINS, String(DEFAULT_CORS_PREFLIGHT_CONTINUE), DEFAULT_CORS_METHODS]);
    origins = originsS.split(",").map(s => s.trim());
    methods = methodsS;
    preFlightContinue = preFlightContinueS.toLocaleLowerCase() === "true";
  }
  if (origins && origins.length === 1) {
    origins = origins[0];
  }

  const isOriginAllowed = (origin: string | undefined): boolean => {
    if (origins instanceof Array) {
      for (const o of origins) {
        if (origin === o || o === "*") {
          return true;
        }
      }
      return false;
    } else {
      return origin === origins;
    }
  };

  return async (ctx: Context): Promise<void> => {
    // access-control-allow-origin
    if (!origins || origins === '*') {
      // allow any origin
      ctx.setHeader("Access-Control-Allow-Origin", "*");
      ctx.addVaryHeader("Origin");
    } else {
      if (ctx.headers.origin) {
        if (isOriginAllowed(ctx.headers.origin)) {
          // reflect origin
          ctx.setHeader("Access-Control-Allow-Origin", String(ctx.headers.origin));
          ctx.addVaryHeader("Origin");
        } else {
          // not allowed
          throw new BadRequestError(`bad origin`);
        }
      }
    }

    if (ctx.method.toUpperCase() === "OPTIONS") {
      // access-control-request-headers
      if (methods) {
        ctx.setHeader("Access-Control-Allow-Methods", methods);
      }
      // reflect access-control-request-headers
      const allowedHeaders = ctx.headers['access-control-request-headers'];
      if (allowedHeaders) {
        ctx.addVaryHeader("Access-Control-Request-Headers");
        ctx.setHeader("Access-Control-Allow-Headers", allowedHeaders);
      }
      // after preflight
      if (preFlightContinue) {
        return;
      } else {
        ctx.end({
          headers: {
            "Content-Length": 0
          },
          status: 204,
          body: undefined
        });
      }
    }
  }
};

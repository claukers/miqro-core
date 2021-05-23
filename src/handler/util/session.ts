import { checkEnvVariables, ForbiddenError, parseOptions, UnAuthorizedError, VerifyTokenService } from "../../util";
import { Context, Handler } from "../common";

const DEFAULT_TOKEN_LOCATION = "header";
const DEFAULT_TOKEN_HEADER = "Authorization";
const DEFAULT_TOKEN_QUERY = "token";
const DEFAULT_TOKEN_COOKIE = "Authorization";

export interface SessionHandlerOptions {
  authService: VerifyTokenService;
  options?: {
    tokenLocation: "header" | "query" | "cookie";
    tokenLocationName: string | ((ctx: Context) => Promise<string>);
  }
}

export const SessionHandler = (config: SessionHandlerOptions): Handler<void> => {
  if (!config.options) {
    const tokenLocation = checkEnvVariables(["TOKEN_LOCATION"], [DEFAULT_TOKEN_LOCATION])[0];
    config.options = {
      tokenLocation: tokenLocation as any,
      tokenLocationName: ""
    };
    switch (tokenLocation) {
      case "header":
        config.options.tokenLocationName = checkEnvVariables(["TOKEN_HEADER"], [DEFAULT_TOKEN_HEADER])[0];
        break;
      case "query":
        config.options.tokenLocationName = checkEnvVariables(["TOKEN_QUERY"], [DEFAULT_TOKEN_QUERY])[0];
        break;
      case "cookie":
        config.options.tokenLocationName = checkEnvVariables(["TOKEN_COOKIE"], [DEFAULT_TOKEN_COOKIE])[0];
        break;
      default:
        throw new Error(`TOKEN_LOCATION=${tokenLocation} not supported use (header or query)`);
    }
  } else {
    config.options = parseOptions("options", config.options as any, [
      { name: "tokenLocation", required: true, type: "enum", enumValues: ["header", "query", "cookie"] },
      { name: "tokenLocationName", required: true, type: "any" }
    ], "no_extra") as any;
  }

  if (!config.authService) {
    throw new Error("authService must be provided!");
  }
  if (!config.options) {
    throw new Error("config.options not populated!");
  }
  const tokenLocation = config.options.tokenLocation;
  const tokenLocationName = config.options.tokenLocationName;

  return async (ctx: Context): Promise<void> => {
    try {
      const tlN = typeof tokenLocationName === "string" ? tokenLocationName : await tokenLocationName(ctx);
      let token = null;
      switch (tokenLocation) {
        case "header":
          token = ctx.headers[(tlN).toLowerCase()] as string;
          break;
        case "query":
          token = ctx.query[tlN] as string;
          break;
        case "cookie":
          token = ctx.cookies[tlN] ? ctx.cookies[tlN] : undefined;
          break;
        default:
          throw new Error(`TOKEN_LOCATION=${tokenLocation} not supported use (header, query or cookie)`);
      }
      if (!token) {
        ctx.logger.warn("No token provided!");
        throw new ForbiddenError("NO TOKEN");
      } else {
        const session = await config.authService.verify({ token, ctx });
        if (!session) {
          ctx.logger.warn("fail to authenticate token [%s]!", token);
          throw new UnAuthorizedError();
        } else {
          ctx.session = session;
          ctx.logger.debug("authenticated!");
        }
      }
    } catch (e) {
      if (e.message === "NO TOKEN") {
        throw e;
      } else {
        throw new UnAuthorizedError();
      }
    }
  };
};



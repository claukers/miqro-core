import { BAD_REQUEST, ERROR_RESPONSE, FORBIDDEN, NOT_FOUND, UNAUTHORIZED, Context, ErrorHandler } from "./common";

export const DefaultErrorHandler = (): ErrorHandler => {
  return async (e: Error, ctx: Context) => {
    if (!e || !e.name || e.name === "Error") {
      if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
        ctx.logger.error(e);
        await ctx.end(ERROR_RESPONSE(`${e && e.message ? e.message : String(e)}. You are seeing this message because NODE_ENV === "development" || NODE_ENV === "test"${e && e.stack ? ` ${e.stack}` : ""}`));
        return false;
      }
    } else {
      ctx.logger.error(e);
      switch (e.name) {
        case "MethodNotImplementedError":
          await ctx.end(NOT_FOUND(e.message));
          break;
        case "ForbiddenError":
          await ctx.end(FORBIDDEN(e.message));
          break;
        case "UnAuthorizedError":
          await ctx.end(UNAUTHORIZED(e.message));
          break;
        case "ParseOptionsError":
        case "SequelizeValidationError":
        case "SequelizeEagerLoadingError":
        case "SequelizeUniqueConstraintError":
          await ctx.end(BAD_REQUEST(e.message));
          break;
        default:
          await ctx.end(ERROR_RESPONSE(e.message));
          break;
      }
      return false;
    }
    return true;
  };
};

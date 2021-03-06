import { inspect } from "util";
import { Method, Handler, normalizePath, Context, ErrorHandler, PathToken, tokenizePath, matchTokenizePath } from "./common";

export interface RouterHandler {
  handler: Handler | Handler[] | Router;
  method?: Method;
  path?: string;
  tokens: PathToken[]
}

export class Router {
  protected readonly handlers: RouterHandler[] = [];
  protected readonly errorHandlers: ErrorHandler[] = [];
  public get(path: string, handler: Array<Handler> | Handler | Router): Router {
    return this.use(handler, path, "get");
  }
  public post(path: string, handler: Array<Handler> | Handler | Router): Router {
    return this.use(handler, path, "post");
  }
  public patch(path: string, handler: Array<Handler> | Handler | Router): Router {
    return this.use(handler, path, "patch");
  }
  public delete(path: string, handler: Array<Handler> | Handler | Router): Router {
    return this.use(handler, path, "delete");
  }
  public put(path: string, handler: Array<Handler> | Handler | Router): Router {
    return this.use(handler, path, "put");
  }
  public options(path: string, handler: Array<Handler> | Handler | Router): Router {
    return this.use(handler, path, "options");
  }
  public use(handler: Array<Handler> | Handler | Router, path?: string, method?: Method): Router {
    if (handler instanceof Array) {
      for (const h of handler) {
        const nPath = path !== undefined ? normalizePath(path) : undefined;
        this.handlers.push({
          handler: h,
          method,
          path: nPath,
          tokens: tokenizePath(nPath)
        });
      }
    } else {
      const nPath = path !== undefined ? normalizePath(path) : undefined;
      this.handlers.push({
        handler,
        method,
        path: nPath,
        tokens: tokenizePath(nPath)
      });
    }
    return this;
  }
  public catch(errorHandler: Array<ErrorHandler> | ErrorHandler): Router {
    if (errorHandler instanceof Array) {
      for (const e of errorHandler) {
        this.errorHandlers.push(e);
      }
    } else {
      this.errorHandlers.push(errorHandler);
    }
    return this;
  }
  protected isMatch(ctx: Context, h: RouterHandler, prePath?: string): boolean {
    if ((h.method === undefined || h.method.toLocaleLowerCase() === ctx.method.toLocaleLowerCase())) {

      if (h.path === undefined) {
        return true;
      }

      const ret = typeof h.handler === "function" || h.handler instanceof Array ?
        matchTokenizePath(false, h.tokens, ctx, prePath) :
        matchTokenizePath(true, h.tokens, ctx, prePath);
      ctx.params = ret.params;
      return ret.match;
    }
    return false;
  }
  protected callHandler = async (ctx: Context, handler: Handler | Router, prePath?: string): Promise<boolean> => {
    const shouldContinue = typeof handler === "function" ?
      await handler(ctx) : await handler.run(ctx, prePath);
    if (shouldContinue === false) {
      // ctx.logger.debug(`avoiding next handlers because handler returned false.`);
      return false;
    } else if (shouldContinue !== true && shouldContinue !== undefined) {
      ctx.logger.trace("pushing to results [%s]", inspect(shouldContinue));
      ctx.results.push(shouldContinue);
    } /*else {
      // ctx.logger.debug("NOT pushing to results [%s]", String(shouldContinue));
    }*/
    return true;
  };
  protected async handleError(e: Error, ctx: Context): Promise<boolean> {
    for (const eH of this.errorHandlers) {
      const ret = await eH(e, ctx);
      if (ret === false) {
        return false;
      } else if (ctx.res.headersSent) {
        return false;
      }
    }
    throw e; // pass the error along
  }
  public async run(ctx: Context, prePath?: string): Promise<boolean> {
    try {
      let shouldContinue = true;
      for (const h of this.handlers) {

        if (!shouldContinue) {
          break;
        }
        if (this.isMatch(ctx, h, prePath)) {
          if (h.handler instanceof Array) {
            for (const hh of h.handler) {
              if (ctx.res.headersSent) {
                shouldContinue = false;
                break;
              }
              shouldContinue = await this.callHandler(ctx, hh);
              if (!shouldContinue) {
                break;
              }
            }
            if (!shouldContinue) {
              break;
            }
          } else {
            if (ctx.res.headersSent) {
              shouldContinue = false;
              break;
            }
            shouldContinue = await this.callHandler(
              ctx,
              h.handler,
              `${prePath ? prePath : "/"}${h.path ? h.path.substring(1) : ""}`
            );

            if (!shouldContinue) {
              break;
            }
          }
        }
      }
      return !ctx.res.headersSent;
    } catch (e) {
      return this.handleError(e, ctx);
    }
  }
}

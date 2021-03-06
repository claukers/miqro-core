import { createServer, RequestListener, Server } from "http";
import { Router, NOT_FOUND, Context, DefaultErrorHandler, ErrorHandler, ERROR_RESPONSE } from "./handler";

export class App extends Router {
  public readonly listener: RequestListener;
  public errorHandler: ErrorHandler;

  constructor() {
    super();
    this.errorHandler = DefaultErrorHandler();
    this.listener = async (req, res) => {
      const ctx = new Context(req, res);
      ctx.logger.trace(`request received`);
      try {
        await this.run(ctx);
        if (!ctx.res.headersSent) {
          ctx.end(NOT_FOUND());
        }
      } catch (e) {
        try {
          await this.handleError(e, ctx);
        } catch (e2) {
          this.errorHandler(e, ctx).then(() => {
            if (!ctx.res.headersSent) {
              ctx.logger.error(e);
              ctx.end(ERROR_RESPONSE());
            }
          }).catch((e: Error) => ctx.logger.error(e));
        }
      }
    };
  }
  public listen(...args: any[]): Server {
    return createServer(this.listener).listen(...args)
  }
}

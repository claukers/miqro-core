import { Context, Handler } from "../handler";

export const TagResponse = (): Handler<void> =>
  async (ctx: Context): Promise<void> => {
    if (ctx.uuid) {
      ctx.setHeader("uuid", ctx.uuid);
    }
    const requestUUID = ctx.headers['request-uuid'];
    if (requestUUID) {
      ctx.setHeader("request-uuid", requestUUID);
    }
  };


import { BadRequestError, Context, Handler } from "../handler";
import { checkEnvVariables } from "../util";
import { DEFAULT_READ_BUFFER_LIMIT } from "./buffer";

export const TextParser = (options?: {
  limit: number;
  type: string;
}): Handler<void> => {
  let limit = DEFAULT_READ_BUFFER_LIMIT;
  let type = "plain/text";
  if (options) {
    limit = options.limit !== undefined ? options.limit : limit;
    type = options.type !== undefined ? options.type : type;
  } else {
    const [limitS, typeS] =
      checkEnvVariables(["BODY_TEXT_PARSER_LIMIT", "BODY_TEXT_PARSER_TYPE"], [String(DEFAULT_READ_BUFFER_LIMIT), "plain/text"]);
    limit = parseInt(limitS, 10);
    type = typeS;
  }
  return async (ctx: Context): Promise<void> => {
    try {
      const isType = ctx.body === undefined && ctx.headers["content-type"] ? ctx.headers["content-type"].toLocaleLowerCase().indexOf(type.toLocaleLowerCase()) !== -1 : false;
      if (isType && ctx.buffer && ctx.buffer.length <= limit) {
        const string = ctx.buffer.toString();
        ctx.body = string;
      } else if (isType && ctx.buffer && ctx.buffer.length > limit) {
        ctx.logger.error(`ctx.buffer.length ${ctx.buffer.length} > ${limit}. To accept this body set BODY_TEXT_PARSER_LIMIT to a higher value.`);
        throw new BadRequestError(`buffer.length ${ctx.buffer.length} > ${limit}`);
      }
    } catch (e) {
      ctx.logger.error(e);
      throw new BadRequestError();
    }
  };
};

import { inspect } from "util";
import { normalizeParseOptions, ParseOptions, parseOptions } from "../util";
import { Context, Handler } from "./common";

export interface ParseRequestOptions {
  query?: ParseOptions | false | ParseOptions[];
  params?: ParseOptions | false;
  body?: ParseOptions | false | ParseOptions[];
}

const parseRequestPart = (part: "query" | "body" | "params", ctx: Context, option: ParseOptions | ParseOptions[]): void => {
  const value = ctx[part] === undefined ? {} : ctx[part];
  if (option instanceof Array) {
    for (let i = 0; i < option.length; i++) {
      const o = option[i];
      try {
        const parsed = parseOptions(`${part}`, value as any, o.options, o.mode, o.ignoreUndefined) as any;
        ctx[part] = parsed;
        ctx.logger.debug(`req.${part} parsed to [${inspect(ctx[part])}]`);
        return;
      } catch (e) {
        if (i === option.length - 1) {
          throw e;
        } else {
          continue;
        }
      }
    }
  } else {
    ctx[part] = parseOptions(`${part}`, value as any, option.options, option.mode, option.ignoreUndefined) as any;
    ctx.logger.debug(`req.${part} parsed to [${inspect(ctx[part])}]`);
  }
}


export const ParseRequest = (options: ParseRequestOptions): Handler<void> => {
  const query = normalizeParseOptions(options.query);
  const params = normalizeParseOptions(options.params);
  const body = normalizeParseOptions(options.body);

  return async (ctx: Context): Promise<void> => {
    try {
      try {
        if (options.query !== undefined) {
          parseRequestPart("query", ctx, query);
        }
      } catch (e) {
        ctx.logger.error(`error parsing query %s`, inspect(ctx.query));
        throw e;
      }

      try {
        if (options.params !== undefined) {
          parseRequestPart("params", ctx, params);
        }
      } catch (e) {
        ctx.logger.error(`error parsing params %s`, inspect(ctx.params));
        throw e;
      }

      try {
        if (options.body !== undefined) {
          parseRequestPart("body", ctx, body);
        }
      } catch (e) {
        ctx.logger.error(`error parsing body %s`, inspect(ctx.body));
        throw e;
      }
    } catch (e) {
      ctx.logger.warn(`error parsing request: ${e.message}`);
      throw e;
    }
  }
};

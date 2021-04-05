import { ParseOption, ParseOptionMap, ParseOptionsError, ParseOptionsMode } from "../../util";
import { OutgoingHttpHeaders } from "http";
import { Context } from "./context";

export type Method = "get" | "post" | "put" | "delete" | "patch" | "options" | "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

export * from "./context";
export * from "./response";

export type Handler = (ctx: Context) => Promise<boolean | void | any> | HandlerFunction;
type HandlerFunction = (ctx: Context) => boolean | void | any;

export type ErrorHandler = (e: Error, ctx: Context) => Promise<boolean | void | any>;

export interface ParseOptions {
  disableAsArray?: boolean;
  options: ParseOption[] | ParseOptionMap;
  mode?: ParseOptionsMode;
  ignoreUndefined?: boolean;
}

const NO_OPTIONS: ParseOptions = {
  options: [],
  mode: "no_extra"
};

export const getParseOption = (option?: ParseOptions | false): ParseOptions =>
  option ? option : (option === false ? NO_OPTIONS : {
    options: [],
    mode: "add_extra"
  });

export const BadRequestError = ParseOptionsError;

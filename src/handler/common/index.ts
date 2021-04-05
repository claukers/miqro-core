import { ParseOptionsError } from "../../util";
import { Context } from "./context";

export type Method = "get" | "post" | "put" | "delete" | "patch" | "options" | "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

export * from "./context";
export * from "./response";

export type Handler = (ctx: Context) => Promise<boolean | void | any> | HandlerFunction;
type HandlerFunction = (ctx: Context) => boolean | void | any;

export type ErrorHandler = (e: Error, ctx: Context) => Promise<boolean | void | any>;

export const BadRequestError = ParseOptionsError;

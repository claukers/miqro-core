import { ParseOptionsError } from "../../util";
import { Context } from "./context";

export type Method = "get" | "post" | "put" | "delete" | "patch" | "options" | "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

export * from "./context";
export * from "./proxyutils";
export * from "./response";

export type Handler<T = boolean | void | any> = ((ctx: Context) => Promise<T>) | ((ctx: Context) => T);

export type ErrorHandler<T = boolean | void | any> = ((e: Error, ctx: Context) => Promise<T>) | ((e: Error, ctx: Context) => T);

export const BadRequestError = ParseOptionsError;

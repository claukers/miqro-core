import { RequestOptions } from "../../util";
import { Context } from "./context";

export interface ProxyServiceInterface {
  resolveRequest(ctx: Context): Promise<RequestOptions>;
}

export interface ProxyOptionsInterface {
  proxyService: ProxyServiceInterface;
}

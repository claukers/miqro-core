import { RequestOptions } from "../../../util";
import { Context } from "../../common";

export interface ProxyServiceInterface {
  resolveRequest(ctx: Context): Promise<RequestOptions>;
}

export interface ProxyOptionsInterface {
  proxyService: ProxyServiceInterface;
}

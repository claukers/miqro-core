import { Context } from "../handler";
import {Map, SimpleTypes} from "./parser";

export interface VerifyTokenService {
  verify(args: { token: string, ctx: Context }): Promise<Session | null>;
}

export interface NoTokenSession extends Map<SimpleTypes> {
  account: string;
  username: string;
  groups: string[];
}

export interface Session extends NoTokenSession {
  token: string;
}

export * from "./util";
export * from "./test_helper";
export * from "./group";
export * from "./parser";
export * from "./request";
export * from "./request_common";

export * from "./logger";
export * from "./error";
export * from "./cli";
export * from "./loader";
export * from "./featuretoggle";
export * from "./config";


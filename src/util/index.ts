export interface VerifyTokenService {
  verify(args: { token: string }): Promise<Session | null>;
}

export interface NoTokenSession {
  account: string;
  username: string;
  groups: string[];
}

export interface Session extends NoTokenSession {
  token: string;
}

export * from "./util";
export * from "./group";
export * from "./option-parser";
export * from "./request";

export * from "./stopwatch";
export * from "./logger";
export * from "./error";
export * from "./cli";
export * from "./loader";
export * from "./featuretoggle";
export * from "./config";


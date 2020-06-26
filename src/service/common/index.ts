export interface NoTokenSessionInterface {
  account: string;
  username: string;
  groups: string[];
}

export interface SessionInterface extends NoTokenSessionInterface {
  token: string;
}
export * from "./model";
export * from "./amodel";

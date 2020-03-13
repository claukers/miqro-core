import { ISession } from "./common";
export * from "./common";

// noinspection JSUnusedGlobalSymbols
export interface IVerifyTokenService {
  verify(args: { token: string }): Promise<ISession>;
}

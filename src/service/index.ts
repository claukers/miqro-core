import { ISession } from "./common";
export * from "./common";

export interface IVerifyTokenService {
  verify(args: { token: string }): Promise<ISession>;
}

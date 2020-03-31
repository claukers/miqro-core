import {INoTokenSession, ISession} from "./common";
import {UnAuthorizedError, Util} from "../util";

export * from "./common";
import {decode} from "jsonwebtoken";
import {inspect} from "util";

// noinspection JSUnusedGlobalSymbols
export interface IVerifyTokenService {
  verify(args: { token: string }): Promise<ISession>;
}

export class VerifyJWTEndpointService implements IVerifyTokenService {

  private static instance: VerifyJWTEndpointService = null;

  public static getInstance(): VerifyJWTEndpointService {
    VerifyJWTEndpointService.instance =
      VerifyJWTEndpointService.instance ? VerifyJWTEndpointService.instance : new VerifyJWTEndpointService();
    return VerifyJWTEndpointService.instance;
  }

  private logger: any = null;

  constructor() {
    Util.checkEnvVariables(["TOKEN_VERIFY_ENDPOINT", "TOKEN_VERIFY_ENDPOINT_METHOD"]);
    Util.checkEnvVariables(["TOKEN_LOCATION"]);
    switch (process.env.TOKEN_LOCATION) {
      case "header":
        Util.checkEnvVariables(["TOKEN_HEADER"]);
        break;
      case "query":
        Util.checkEnvVariables(["TOKEN_QUERY"]);
        break;
      default:
        throw new Error(`TOKEN_LOCATION=${process.env.TOKEN_LOCATION} not supported use (header or query)`);
    }
    this.logger = Util.getLogger("VerifyTokenEndpointService");
  }

  public async verify({token}: { token: string }): Promise<ISession> {
    try {
      this.logger.debug(`verifying [${token}] on [${process.env.TOKEN_VERIFY_ENDPOINT}].header[${process.env.TOKEN_HEADER}]`);
      let response = null;
      switch (process.env.TOKEN_LOCATION) {
        case "header":
          response = await Util.request({
            url: `${process.env.TOKEN_VERIFY_ENDPOINT}`,
            headers: {
              [process.env.TOKEN_HEADER]: token
            },
            method: `${process.env.TOKEN_VERIFY_ENDPOINT_METHOD}` as any
          });
          break;
        case "query":
          response = await Util.request({
            url: `${process.env.TOKEN_VERIFY_ENDPOINT}?${process.env.TOKEN_QUERY}=${token}`,
            method: `${process.env.TOKEN_VERIFY_ENDPOINT_METHOD}` as any
          });
          break;
        default:
          throw new Error(`TOKEN_LOCATION=${process.env.TOKEN_LOCATION} not supported use (header or query)`);
      }
      if (response) {
        const session = Util.jwt.decode(token) as INoTokenSession;
        Util.parseOptions("session", session, [
          {name: "username", required: true, type: "string"},
          {name: "account", required: true, type: "string"},
          {name: "groups", required: true, type: "array", arrayType: "string"}
        ], "add_extra");
        this.logger.debug(`authorized token[${token}] with session[${inspect(session)}]`);
        return {
          token,
          ...session
        };
      } else {
        this.logger.warn(`unauthorized token not valid [${token}]`);
        return null;
      }
    } catch (e) {
      this.logger.error(`error verifying [${token}] [${inspect(e)}]`);
      throw new UnAuthorizedError(`Fail to authenticate token!`);
    }
  }
}

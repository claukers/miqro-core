import {SessionInterface} from "./common";
import {UnAuthorizedError, Util} from "../util";
import {inspect} from "util";
import {Logger} from "../util/logger";

export * from "./common";
export * from "./db";

const jwtModule = "jsonwebtoken";
const requestModule = "axios";

// noinspection JSUnusedGlobalSymbols
export interface VerifyTokenServiceInterface {
  verify(args: { token: string }): Promise<SessionInterface>;
}

export class VerifyJWTEndpointService implements VerifyTokenServiceInterface {

  protected static instance: VerifyJWTEndpointService = null;

  public static getInstance(): VerifyJWTEndpointService {
    VerifyJWTEndpointService.instance =
      VerifyJWTEndpointService.instance ? VerifyJWTEndpointService.instance : new VerifyJWTEndpointService();
    return VerifyJWTEndpointService.instance;
  }

  protected logger: Logger = null;

  constructor() {
    Util.checkEnvVariables(["TOKEN_VERIFY_ENDPOINT", "TOKEN_VERIFY_ENDPOINT_METHOD", "TOKEN_VERIFY_LOCATION"]);
    Util.checkModules([jwtModule, requestModule]);
    switch (process.env.TOKEN_VERIFY_LOCATION) {
      case "header":
        Util.checkEnvVariables(["TOKEN_HEADER"]);
        break;
      case "query":
        Util.checkEnvVariables(["TOKEN_QUERY"]);
        break;
      default:
        throw new Error(`TOKEN_VERIFY_LOCATION=${process.env.TOKEN_VERIFY_LOCATION} not supported use (header or query)`);
    }
    this.logger = Util.getLogger("VerifyTokenEndpointService");
  }

  public async verify({token}: { token: string }): Promise<SessionInterface> {
    try {
      /* eslint-disable  @typescript-eslint/no-var-requires */
      const {request} = require(requestModule);
      this.logger.debug(`verifying [${token}] on [${process.env.TOKEN_VERIFY_ENDPOINT}].header[${process.env.TOKEN_HEADER}]`);
      let response = null;
      switch (process.env.TOKEN_VERIFY_LOCATION) {
        case "header":
          response = await request({
            url: `${process.env.TOKEN_VERIFY_ENDPOINT}`,
            headers: {
              [process.env.TOKEN_HEADER]: token
            },
            method: `${process.env.TOKEN_VERIFY_ENDPOINT_METHOD}` as any
          });
          break;
        case "query":
          response = await request({
            url: `${process.env.TOKEN_VERIFY_ENDPOINT}?${process.env.TOKEN_QUERY}=${token}`,
            method: `${process.env.TOKEN_VERIFY_ENDPOINT_METHOD}` as any
          });
          break;
        default:
          throw new Error(`TOKEN_VERIFY_LOCATION=${process.env.TOKEN_VERIFY_LOCATION} not supported use (header or query)`);
      }
      if (response) {
        /* eslint-disable  @typescript-eslint/no-var-requires */
        const jwt = require(jwtModule);
        const session = jwt.decode(token);
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
      this.logger.error(`error verifying [${token}] [${e.response ? e.response.status : ""}][${e.config ? e.config.url : ""}][${e.message}]`);
      throw new UnAuthorizedError(`Fail to authenticate token!`);
    }
  }
}

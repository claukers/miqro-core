import {Handler, NextCallback, Session, VerifyTokenService} from "./common";
import {
  ForbiddenError,
  GroupPolicy,
  GroupPolicyOptions,
  Logger,
  ParseOptionsError,
  UnAuthorizedError,
  Util
} from "../util";

export const SessionHandler = (authService: VerifyTokenService, logger?: Logger): NextCallback => {
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

  if (!logger) {
    logger = Util.getLogger("SessionHandler");
  }
  if (!authService) {
    throw new Error("authService must be provided!");
  }
  return Handler(async (req, res) => {
    let token = null;
    switch (process.env.TOKEN_LOCATION) {
      case "header":
        token = req.headers[process.env.TOKEN_HEADER.toLowerCase()] as string
        break;
      case "query":
        token = req.query[process.env.TOKEN_QUERY] as string;
        break;
    }
    if (!token) {
      const message = `No token provided!`;
      logger.error(message);
      throw new ParseOptionsError(message);
    }
    let session: Session = null;
    try {
      session = await authService.verify({token});
    } catch (e) {
      logger.error(e);
      if (e.name) {
        throw e;
      } else {
        new UnAuthorizedError(`Fail to authenticate token!`);
      }
    }
    if (!session) {
      const message = `Fail to authenticate token [${token}]!`;
      logger.warn(message);
      throw new UnAuthorizedError(`Fail to authenticate token!`);
    }
    req.session = session;
    logger.info(`Token [${token}] authenticated!`);
  }, logger);
};

export const GroupPolicyHandler = (options: GroupPolicyOptions, logger?: Logger): NextCallback => {
  if (!logger) {
    logger = Util.getLogger("GroupPolicyHandler");
  }
  return Handler(async (req, res) => {
    if (!req.session) {
      throw new ParseOptionsError(`No Session!`);
    }
    let result = null;
    try {
      result = await GroupPolicy.validateSession(req.session, options, logger);
    } catch (e) {
      logger.warn(e);
      if (e.name && e.name !== "Error") {
        throw e;
      } else {
        throw new ForbiddenError(`Invalid session. You are not permitted to do this!`);
      }
    }
    if (result) {
      logger.info(`request[${req.uuid}] ` +
        `groups [${req && req.session && req.session.groups ? req.session.groups.join(",") : ""}] validated!`);
    } else {
      logger.warn(`request[${req.uuid}] ` +
        `groups [${req && req.session && req.session.groups ? req.session.groups.join(",") : ""}] fail to validate!`);
      throw new UnAuthorizedError(`Invalid session. You are not permitted to do this!`);
    }
  }, logger);
};

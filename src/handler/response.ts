import {
  APIResponse,
  BadRequestResponse,
  ErrorResponse,
  ForbiddenResponse,
  NotFoundResponse,
  ServiceResponse,
  UnAuthorizedResponse
} from "./responses";
import {inspect} from "util";
import {Logger, Util} from "../util";
import {IErrorHandlerCallback, INextHandlerCallback, NextErrorHandler} from "./common";

export const createErrorResponse = async (e: Error): Promise<APIResponse> => {
  if (!e.name || e.name === "Error") {
    return null;
  } else {
    // noinspection SpellCheckingInspection
    switch (e.name) {
      case "MethodNotImplementedError":
        return new NotFoundResponse();
      case "ForbiddenError":
        return new ForbiddenResponse(e.message);
      case "UnAuthorizedError":
        return new UnAuthorizedResponse(e.message);
      case "ParseOptionsError":
      case "SequelizeValidationError":
      case "SequelizeEagerLoadingError":
      case "SequelizeUniqueConstraintError":
        return new BadRequestResponse(e.message);
      default:
        return new ErrorResponse(e);
    }
  }
};

/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
export const createServiceResponse = async (req: any): Promise<ServiceResponse> => {
  const {results} = req;
  if (!results || results.length === 0) {
    return null;
  }
  const response = results && results.length > 1 ? results : (
    results && results.length === 1 ? results[0] : null
  );
  return new ServiceResponse(response);
};

/**
 * Express middleware that uses req.results to create a response.
 *
 * @param logger  [OPTIONAL] logger for logging errors ´ILogger´.
 */
export const ResponseHandler = (logger?: Logger): INextHandlerCallback => {
  if (!logger) {
    logger = Util.getLogger("ResponseHandler");
  }
  return NextErrorHandler(async (req, res, next) => {
    const response = await createServiceResponse(req);
    logger.debug(`request[${req.uuid}] response[${inspect(response)}]`);
    if (!response) {
      next();
    } else {
      await response.send(res);
    }
  }, logger);
};

// noinspection SpellCheckingInspection
/**
 * Express middleware that catches sequelize and other known errors. If the error is not **known** the next callback is called.
 *
 * @param logger  [OPTIONAL] logger for logging errors ´ILogger´.
 */
export const ErrorHandler = (logger?: Logger): IErrorHandlerCallback => {
  if (!logger) {
    logger = Util.getLogger("ErrorHandler");
  }
  return async (err: Error, req, res, next): Promise<void> => {
    try {
      logger.error(`request[${req.uuid}] ${inspect(err)}`);
      const response = await createErrorResponse(err);
      if (response) {
        await response.send(res);
      } else {
        next(err);
      }
    } catch (e) {
      next(e);
    }
  };
};

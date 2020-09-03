import {existsSync} from "fs";
import {dirname, resolve} from "path";
import {Util} from "./util";
import {ConfigPathResolver} from "./config";
import {DefaultLogger, Logger, LoggerFormatter, LogLevel} from "./logger";

// noinspection SpellCheckingInspection

export type LoggerFactory = (identifier: string, formatter?: LoggerFormatter) => Logger;

export const defaultLoggerFactory: LoggerFactory = (identifier: string, formatter?: LoggerFormatter): Logger => {
  const level = (process.env[`LOG_LEVEL_${identifier}`] || process.env.LOG_LEVEL || "info") as LogLevel;
  return new DefaultLogger(identifier, level, formatter);
};

export const getLoggerFactory = (): LoggerFactory => {
  const logPath = resolve(ConfigPathResolver.getConfigDirname(), `log.js`);
  if (existsSync(logPath)) {
    return require(logPath);
  } else {
    return defaultLoggerFactory;
  }
};

export const setupSimpleEnv = (): void => {
  process.env.NODE_ENV = process.env.NODE_ENV || "development";
};

export const setupInstanceEnv = (serviceName: string, scriptPath: string, logger = Util.logger): void => {
  const microDirname = resolve(dirname(scriptPath));
  if (!
    process.env.MIQRO_DIRNAME || process.env.MIQRO_DIRNAME === "undefined"
  ) {
    process.env.MIQRO_DIRNAME = microDirname;
  } else {
    // noinspection SpellCheckingInspection
    logger.warn(`NOT changing to MIQRO_DIRNAME [${microDirname}] because already defined as ${process.env.MIQRO_DIRNAME}!`);
  }
  process.chdir(microDirname);
  process.env.MICRO_NAME = serviceName;
  setupSimpleEnv();
}

export const setServiceName = (name: string): string => {
  process.env.MIQRO_SERVICE_NAME = name;
  return process.env.MIQRO_SERVICE_NAME;
};

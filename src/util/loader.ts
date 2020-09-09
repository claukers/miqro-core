import {dirname, resolve} from "path";
import {Util} from "./util";
import {DefaultLogger, Logger, LoggerFormatter, LogLevel} from "./logger";

// noinspection SpellCheckingInspection

export type LoggerFactory = (args: { identifier: string, formatter?: LoggerFormatter, level: LogLevel; }) => Logger;

export const defaultLoggerFactory: LoggerFactory = ({identifier, formatter, level}): Logger => {
  return new DefaultLogger(identifier, level, formatter);
};

let customLoggerFactory: LoggerFactory;

export const setLoggerFactory = (factory: LoggerFactory): LoggerFactory => {
  customLoggerFactory = factory;
  return customLoggerFactory;
}

export const getLoggerFactory = (): LoggerFactory => {
  if (customLoggerFactory) {
    return customLoggerFactory;
  } else {
    return defaultLoggerFactory;
  }
};

export const setupNodeEnv = (): void => {
  if (process) {
    process.env = {
      ...process.env,
      NODE_ENV: process.env.NODE_ENV || "development"
    }; // this is for webpack
  }
};

export const setupScriptEnv = (serviceName: string, scriptPath: string, logger = Util.logger): void => {
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
  setupNodeEnv();
}

export const setServiceName = (name: string): string => {
  process.env.MIQRO_SERVICE_NAME = name;
  return process.env.MIQRO_SERVICE_NAME;
};

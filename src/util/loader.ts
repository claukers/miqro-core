import {dirname, resolve} from "path";
import {Util} from "./util";
import {DefaultLogger, Logger, LoggerFormatter, LogLevel} from "./logger";
import {ConfigPathResolver} from "./config";
import {existsSync} from "fs";
import {ConfigFileNotFoundError} from "./error";

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
  if (process.env) {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: process.env.NODE_ENV || "development"
    }); // this is for webpack
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

export const loadSequelizeRC = (sequelizercPath: string = ConfigPathResolver.getSequelizeRCFilePath()): {
  // noinspection SpellCheckingInspection
  sequelizercPath: string;
  dbConfigFilePath: string;
  migrationsFolder: string;
  seedersFolder: string;
  modelsFolder: string;
} => {
  const logger = Util.getLogger("Database");
  // noinspection SpellCheckingInspection
  if (!existsSync(sequelizercPath)) {
    // noinspection SpellCheckingInspection
    throw new ConfigFileNotFoundError(`missing .sequelizerc file. maybe you didnt init your db config.`);
  } else {
    logger.debug(`loading sequelize config from [${sequelizercPath}]`);
    // noinspection SpellCheckingInspection
    /* eslint-disable  @typescript-eslint/no-var-requires */
    const sequelizerc = require(sequelizercPath);
    const modelsFolder = sequelizerc["models-path"];
    if (!existsSync(modelsFolder)) {
      throw new ConfigFileNotFoundError(`missing .sequelizerc["models-path"]=[${modelsFolder}] file. maybe you didnt init your db config.`);
    }
    return {
      sequelizercPath,
      dbConfigFilePath: sequelizerc.config,
      migrationsFolder: sequelizerc["migrations-path"],
      seedersFolder: sequelizerc["seeders-path"],
      modelsFolder
    };
  }
};

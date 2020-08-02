import {existsSync} from "fs";
import {dirname, resolve} from "path";
import {Util} from "./util";
import {ConfigPathResolver} from "./config";
import {DefaultLogger, Logger, LogLevel} from "./logger";
import {ConfigFileNotFoundError} from "./error";

// noinspection SpellCheckingInspection

export type LoggerFactory = (identifier: string) => Logger;

export const defaultLoggerFactory: LoggerFactory = (identifier: string): Logger => {
  const level = (process.env[`LOG_LEVEL_${identifier}`] || process.env.LOG_LEVEL || "info") as LogLevel;
  return new DefaultLogger(identifier, level);
};

// noinspection SpellCheckingInspection
export const loadSequelizeRC = (): {
  // noinspection SpellCheckingInspection
  sequelizercPath: string;
  dbConfigFilePath: string;
  migrationsFolder: string;
  seedersFolder: string;
  modelsFolder: string;
} => {
  const logger = Util.getLogger("Database");
  // noinspection SpellCheckingInspection
  const sequelizercPath = ConfigPathResolver.getSequelizeRCFilePath();
  if (!existsSync(sequelizercPath)) {
    // noinspection SpellCheckingInspection
    throw new ConfigFileNotFoundError(`missing .sequelizerc file. maybe you didnt run miqro-database init.`);
  } else {
    logger.debug(`loading sequelize config from [${sequelizercPath}]`);
    // noinspection SpellCheckingInspection
    /* eslint-disable  @typescript-eslint/no-var-requires */
    const sequelizerc = require(sequelizercPath);
    const modelsFolder = sequelizerc["models-path"];
    if (!existsSync(modelsFolder)) {
      throw new ConfigFileNotFoundError(`missing .sequelizerc["models-path"]=[${modelsFolder}] file. maybe you didnt run miqro-database init.`);
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

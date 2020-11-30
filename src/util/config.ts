import {resolve} from "path";
import {ConfigOutput} from "./util";
import {loadMiqroRC} from "./loader";

export const setupNodeEnv = (): void => {
  if (process.env) {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: process.env.NODE_ENV || "development"
    }); // this is for webpack
  }
};

export const setServiceName = (name: string): string => {
  process.env.MIQRO_SERVICE_NAME = name;
  return process.env.MIQRO_SERVICE_NAME;
};

export interface MiqroRC {
  configDirname: string;
}

export interface SequelizeRC {
  // noinspection SpellCheckingInspection
  sequelizercPath: string;
  dbConfigFilePath: string;
  migrationsFolder: string;
  seedersFolder: string;
  modelsFolder: string;
}

export abstract class ConfigPathResolver {

  public static getMiqroRCFilePath(): string {
    return resolve(ConfigPathResolver.getBaseDirname(), `.miqrorc`);
  }

  public static getSequelizeRCFilePath(): string {
    return resolve(ConfigPathResolver.getBaseDirname(), `.sequelizerc`);
  }

  public static getCustomLoggerFactoryPath(): string {
    return resolve(ConfigPathResolver.getConfigDirname(), `log.js`);
  }

  public static getConfigDirname(): string {
    const miqroRCConfig = loadMiqroRC();
    if (miqroRCConfig) {
      return resolve(miqroRCConfig.configDirname, `${process.env.NODE_ENV}`);
    } else {
      return resolve(ConfigPathResolver.getBaseDirname(), `config`, `${process.env.NODE_ENV}`);
    }
  }

  public static getBaseDirname(): string {
    if (process.env.MIQRO_DIRNAME) {
      return process.env.MIQRO_DIRNAME;
    } else {
      return process.cwd();
    }
  }

  public static getServiceName(): string {
    return process.env.MIQRO_SERVICE_NAME ? process.env.MIQRO_SERVICE_NAME : "";
  }
}

export interface LoadConfigOut {
  combined: ConfigOutput;
  outputs: ConfigOutput[]
}

import {extname, resolve} from "path";
import {ConfigOutput, Util} from "./util";
import {getLogger, Logger, LoggerFactory, setLoggerFactory} from "./logger";
import {existsSync, readdirSync, readFileSync} from "fs";
import {ConfigPathResolver, LoadConfigOut, MiqroRC, SequelizeRC} from "./config";
import {ConfigFileNotFoundError} from "./error";
import {parseOptions, SimpleMap} from "./option-parser";

const LOADER_IDENTIFIER = "loader";


// noinspection SpellCheckingInspection
export const LoaderCache: {
  config: LoadConfigOut | false;
  loggerFactory: boolean;
  rc: MiqroRC | null | false;
  // noinspection SpellCheckingInspection
  sequelizeRC: SequelizeRC | null | false;
  clear: () => void;
} = {
  config: false,
  loggerFactory: false,
  rc: false,
  sequelizeRC: false,
  clear: () => {
    LoaderCache.config = false;
    LoaderCache.loggerFactory = false;
    LoaderCache.rc = false;
    LoaderCache.sequelizeRC = false;
  }
};

export const initLoggerFactory = (modulePath: string = ConfigPathResolver.getCustomLoggerFactoryPath(), logger?: Logger): void => {
  if (!LoaderCache.loggerFactory) {
    LoaderCache.loggerFactory = true;
    if (existsSync(modulePath)) {
      logger = logger ? logger : getLogger(LOADER_IDENTIFIER);
      logger.debug(`loading logger factory from [${modulePath}]`);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const loggerFactory = require(modulePath) as LoggerFactory;
      setLoggerFactory(loggerFactory);
    }
  }
};

export const loadSequelizeRC = (sequelizercPath: string = ConfigPathResolver.getSequelizeRCFilePath(), logger?: Logger): SequelizeRC => {
  if (LoaderCache.sequelizeRC === false) {
    LoaderCache.sequelizeRC = null;
    logger = logger ? logger : getLogger(LOADER_IDENTIFIER);
    // noinspection SpellCheckingInspection
    if (!existsSync(sequelizercPath)) {
      // noinspection SpellCheckingInspection
      throw new ConfigFileNotFoundError(`missing .sequelizerc file. maybe you didnt init your db config.`);
    } else {
      logger.debug(`loading sequelize config from [${sequelizercPath}]`);
      // noinspection SpellCheckingInspection
      /* eslint-disable  @typescript-eslint/no-var-requires */
      const sequelizerc = require(sequelizercPath);
      parseOptions(sequelizercPath, sequelizerc, [
        {name: "config", type: "string", required: true},
        {name: "migrations-path", type: "string", required: true},
        {name: "seeders-path", type: "string", required: true},
        {name: "models-path", type: "string", required: true}
      ], "no_extra");
      const ret = {
        sequelizercPath,
        dbConfigFilePath: sequelizerc.config,
        migrationsFolder: sequelizerc["migrations-path"],
        seedersFolder: sequelizerc["seeders-path"],
        modelsFolder: sequelizerc["models-path"]
      };
      LoaderCache.sequelizeRC = ret;
      return ret;
    }
  } else {
    throw new ConfigFileNotFoundError(`missing .sequelizerc file. maybe you didnt init your db config.`);
  }
};

export const loadConfigFile = (envFilePath: string, combined?: SimpleMap<string>, logger?: Logger): ConfigOutput => {
  logger = logger ? logger : getLogger(LOADER_IDENTIFIER);
  const ret: ConfigOutput = {};
  if (!existsSync(envFilePath)) {
    throw new ConfigFileNotFoundError(`config file [${envFilePath}] doesnt exists!`);
  } else {
    logger.debug(`loading config from [${envFilePath}].`);
    readFileSync(envFilePath).toString().split("\n")
      .filter(value => value && value.length > 0 && value.substr(0, 1) !== "#")
      .forEach((line) => {
        const [key, val] = line.split("=");
        ret[key] = val;
      });
    const keys = Object.keys(ret);
    for (const key of keys) {
      if (combined) {
        combined[key] = ret[key];
      }
      Object.defineProperty(process.env, key, {
        value: ret[key]
      }); // this is for webpack
    }
  }
  return ret;
};

const MISSED_TO_RUNMIQRO_INIT = (configDirname: string): string => `no config loaded. env files in [${configDirname}] dont exist!.`;

export const loadConfig = (configDirname: string = ConfigPathResolver.getConfigDirname(), logger?: Logger): LoadConfigOut => {
  if (LoaderCache.config === false) {
    logger = logger ? logger : getLogger(LOADER_IDENTIFIER);
    const outputs: ConfigOutput[] = [];
    const combined = {};
    if (existsSync(configDirname)) {
      const configFiles = readdirSync(configDirname);
      for (const configFile of configFiles) {
        const configFilePath = resolve(configDirname, configFile);
        const ext = extname(configFilePath);
        if (ext === ".env") {
          outputs.push(loadConfigFile(configFilePath, combined, logger));
        }
      }
      if (configFiles.length === 0) {
        logger.debug(MISSED_TO_RUNMIQRO_INIT(configDirname));
      }
    } else {
      logger.debug(MISSED_TO_RUNMIQRO_INIT(configDirname));
    }
    const ret = {combined, outputs};
    LoaderCache.config = ret;
    return ret;
  } else {
    return LoaderCache.config;
  }

};

export const loadMiqroRC = (path = ConfigPathResolver.getMiqroRCFilePath(), logger?: Logger): MiqroRC | null => {
  if (LoaderCache.rc === false) {
    logger = logger ? logger : getLogger(LOADER_IDENTIFIER);
    LoaderCache.rc = null;
    Util.setupNodeEnv();
    if (existsSync(path)) {
      logger.debug(`loading .miqrorc from [${path}]`);
      const o = JSON.parse(readFileSync(path).toString());
      if (o && typeof o === "object") {
        Util.parseOptions(path, o, [
          {name: "configDirname", type: "string", required: false},
          {name: "loggerFactory", type: "string", required: false}
        ], "no_extra");
        o.configDirname = o.configDirname ? resolve(ConfigPathResolver.getBaseDirname(), o.configDirname) : undefined;
        o.loggerFactory = o.loggerFactory ? resolve(ConfigPathResolver.getBaseDirname(), o.loggerFactory) : undefined;
        const ret = o as MiqroRC;
        LoaderCache.rc = ret;
        return ret;
      } else {
        return LoaderCache.rc;
      }
    } else {
      return LoaderCache.rc;
    }
  } else {
    return LoaderCache.rc;
  }
};

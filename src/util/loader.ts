import {extname, resolve} from "path";
import {ConfigOutput, Util} from "./util";
import {getLogger, Logger, LoggerFactory, setLoggerFactory} from "./logger";
import {existsSync, readdirSync, readFileSync} from "fs";
import {ConfigPathResolver, LoadConfigOut, MiqroRC} from "./config";
import {ConfigFileNotFoundError} from "./error";
import {Map} from "./parser";

const LOADER_IDENTIFIER = "loader";

// noinspection SpellCheckingInspection
export const LoaderCache: {
  config: LoadConfigOut | false;
  loggerFactory: boolean;
  rc: MiqroRC | null | false;
  extra: Map<any>;
  clear: () => void;
} = {
  config: false,
  loggerFactory: false,
  rc: false,
  extra: {},
  clear: () => {
    LoaderCache.config = false;
    LoaderCache.loggerFactory = false;
    LoaderCache.rc = false;
    LoaderCache.extra = {};
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


export const loadConfigFile = (envFilePath: string, combined?: Map<string>, logger?: Logger): ConfigOutput => {
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

const MISSED_TO_RUNMIQRO_INIT = (configDirname: string): string => `no config loaded. env files in [${configDirname}] doesnt exist!.`;

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
        Util.parse(path, o, [
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

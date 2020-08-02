import {existsSync, readdirSync, readFileSync} from "fs";
import {extname, resolve} from "path";
import {ConfigOutput, Util} from "./util";
import {SimpleMap} from "./option-parser";
import {ConfigFileNotFoundError} from "./error";
import {Logger} from "./logger";

let miqroRCConfig: {
  serviceDirname: string;
  configDirname: string;
} | null = null;

export abstract class ConfigPathResolver {

  public static getOverrideConfigFilePath(): string | null {
    if (!process.env.MIQRO_OVERRIDE_CONFIG_PATH) {
      return null;
    } else {
      return resolve(ConfigPathResolver.getBaseDirname(), `${process.env.MIQRO_OVERRIDE_CONFIG_PATH}`);
    }
  }

  public static getMiqroRCFilePath(): string {
    return resolve(ConfigPathResolver.getBaseDirname(), `.miqrorc`);
  }

  public static getSequelizeRCFilePath(): string {
    return resolve(ConfigPathResolver.getBaseDirname(), `.sequelizerc`);
  }

  public static getServiceDirname(): string {
    ConfigPathResolver.loadMiqroRC();
    if (miqroRCConfig) {
      return miqroRCConfig.serviceDirname;
    } else {
      return resolve(ConfigPathResolver.getSrcDirname(), `services`);
    }
  }


  public static getConfigDirname(): string {
    ConfigPathResolver.loadMiqroRC();
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

  public static getServiceName(): string | undefined {
    return process.env.MIQRO_SERVICE_NAME;
  }

  private static rcLoaded = false;

  private static getSrcDirname(): string {
    return resolve(ConfigPathResolver.getBaseDirname(), `src`);
  }

  private static loadMiqroRC(): void {
    if (!ConfigPathResolver.rcLoaded) {
      Util.setupSimpleEnv();
      const path = ConfigPathResolver.getMiqroRCFilePath();
      if (existsSync(path)) {
        const o = JSON.parse(readFileSync(path).toString());
        if (o && typeof o === "object") {
          Util.parseOptions(path, o, [
            {name: "serviceDirname", type: "string", required: true},
            {name: "configDirname", type: "string", required: true}
          ], "no_extra");
          o.serviceDirname = resolve(ConfigPathResolver.getBaseDirname(), o.serviceDirname);
          o.configDirname = resolve(ConfigPathResolver.getBaseDirname(), o.configDirname);
          miqroRCConfig = o;
        }
      }
    }
  }
}

export const overrideConfig = (path: string, combined ?: SimpleMap<string>, logger = Util.logger): ConfigOutput[] => {
  const outputs: ConfigOutput[] = [];
  if (!existsSync(path)) {
    throw new ConfigFileNotFoundError(`config file [${path}] doesnt exists!`);
  } else {
    logger.debug(`overriding config with [${path}].`);
    const overrideConfig: ConfigOutput = {};
    readFileSync(path).toString().split("\n")
      .filter(value => value && value.length > 0 && value.substr(0, 1) !== "#")
      .forEach((line) => {
        const [key, val] = line.split("=");
        overrideConfig[key] = val;
      });
    outputs.push(overrideConfig);
    const keys = Object.keys(overrideConfig);
    for (const key of keys) {
      if (combined) {
        combined[key] = overrideConfig[key];
      }
      process.env[key] = overrideConfig[key];
    }
  }
  return outputs;
};


const MISSED_CONFIG = (path: string): string => `nothing loaded from [${path}] env file doesnt exists!`;
const MISSED_TO_RUNMIQRO_INIT = (configDirname: string): string => `loadConfig nothing loaded [${configDirname}] env files dont exist!.`;

export const loadConfig = (configDirname: string = ConfigPathResolver.getConfigDirname(), logger: Logger = Util.logger): { combined: SimpleMap<string>; outputs: ConfigOutput[] } => {
  const overridePath = ConfigPathResolver.getOverrideConfigFilePath();

  let outputs: ConfigOutput[] = [];
  const combined = {};

  if (existsSync(configDirname)) {
    const configFiles = readdirSync(configDirname);
    for (const configFile of configFiles) {
      const configFilePath = resolve(configDirname, configFile);
      const ext = extname(configFilePath);
      if (ext === ".env") {
        logger.debug(`loading ${configFilePath}`);
        outputs = outputs.concat(overrideConfig(configFilePath, combined));
      }
    }

    if (configFiles.length === 0) {
      logger.debug(MISSED_TO_RUNMIQRO_INIT(configDirname));
    }
  } else {
    logger.debug(MISSED_TO_RUNMIQRO_INIT(configDirname));
  }

  if (overridePath && existsSync(overridePath)) {
    outputs = outputs.concat(overrideConfig(overridePath, combined));
  } else if (overridePath) {
    logger.warn(MISSED_CONFIG(overridePath));
  }
  return {combined, outputs};
}

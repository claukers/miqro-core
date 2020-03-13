import {existsSync, readFileSync} from "fs";
import {resolve} from "path";
import {Util} from "./util";

let miqroRCConfig: {
  serviceDirname: string;
  configDirname: string;
} = null;

export abstract class ConfigPathResolver {

  public static getOverrideConfigFilePath() {
    if (!process.env.MIQRO_OVERRIDE_CONFIG_PATH) {
      return null;
    } else {
      return resolve(ConfigPathResolver.getConfigDirname(), `${process.env.MIQRO_OVERRIDE_CONFIG_PATH}`);
    }
  }

  public static getMiqroRCFilePath() {
    return resolve(ConfigPathResolver.getBaseDirname(), `.miqrorc`);
  }

  public static getConfigFilePath() {
    return resolve(ConfigPathResolver.getConfigDirname(), `${process.env.NODE_ENV}.env`);
  }

  public static getServiceDirname() {
    ConfigPathResolver.loadMiqroRC();
    if (miqroRCConfig) {
      return miqroRCConfig.serviceDirname;
    } else {
      return resolve(ConfigPathResolver.getSrcDirname(), `services`);
    }
  }

  public static getConfigDirname() {
    ConfigPathResolver.loadMiqroRC();
    if (miqroRCConfig) {
      return miqroRCConfig.configDirname;
    } else {
      return resolve(ConfigPathResolver.getBaseDirname(), `config`);
    }
  }

  public static getBaseDirname() {
    if (process.env.MIQRO_DIRNAME) {
      return process.env.MIQRO_DIRNAME;
    } else {
      return process.cwd();
    }
  }

  private static rcLoaded: boolean = false;

  private static getSrcDirname() {
    return resolve(ConfigPathResolver.getBaseDirname(), `src`);
  }

  private static loadMiqroRC() {
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

import {existsSync, readFileSync} from "fs";
import {resolve} from "path";
import {Util} from "./util";

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

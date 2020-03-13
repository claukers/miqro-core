import {resolve} from "path";

export abstract class ConfigPathResolver {

  public static getOverrideConfigFilePath() {
    if (!process.env.MIQRO_OVERRIDE_CONFIG_PATH) {
      return null;
    } else {
      return resolve(ConfigPathResolver.getConfigDirname(), `${process.env.MIQRO_OVERRIDE_CONFIG_PATH}`);
    }
  }

  public static getConfigFilePath() {
    return resolve(ConfigPathResolver.getConfigDirname(), `${process.env.NODE_ENV}.env`);
  }

  public static getServiceDirname() {
    return resolve(ConfigPathResolver.getSrcDirname(), `services`);
  }

  public static getSrcDirname() {
    return resolve(ConfigPathResolver.getBaseDirname(), `src`);
  }

  public static getConfigDirname() {
    return resolve(ConfigPathResolver.getBaseDirname(), `config`);
  }

  public static getBaseDirname() {
    if (process.env.MIQRO_DIRNAME) {
      return process.env.MIQRO_DIRNAME;
    } else {
      return process.cwd();
    }
  }
}

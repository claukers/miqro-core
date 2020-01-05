import {resolve} from "path";

export abstract class ConfigPathResolver {

  public static getConfigFilePath() {
    return resolve(ConfigPathResolver.getConfigDirname(), `${process.env.NODE_ENV}.env`);
  }

  public static getServiceDirname() {
    return resolve(ConfigPathResolver.getBaseDirname(), `services`);
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

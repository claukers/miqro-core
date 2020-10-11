import {ConfigPathResolver, loadConfig, overrideConfig} from "./config";
import {getLogger, Logger, LoggerFormatter} from "./logger";
import {request} from "./request";
import {RequestOptions, RequestResponse} from "./request_common";
import {checkEnvVariables, ParseOption, parseOptions, ParseOptionsMode, SimpleMap, SimpleTypes} from "./option-parser";
import {setServiceName, setupNodeEnv, setupScriptEnv} from "./loader";


export type ConfigOutput = SimpleMap<string>;

export abstract class Util {

  public static logger: Logger;

  public static setupNodeEnv(): void {
    return setupNodeEnv();
  }

  public static async request(options: RequestOptions, logger: Logger = Util.logger): Promise<RequestResponse> {
    return request(options, logger);
  }

  public static setServiceName(name: string): string {
    return setServiceName(name);
  }

  public static setupScriptEnv(serviceName: string, scriptPath: string, logger = Util.logger): void {
    return setupScriptEnv(serviceName, scriptPath, logger);
  }

  public static overrideConfig(path: string, combined ?: SimpleMap<string>, logger = Util.logger): ConfigOutput[] {
    return overrideConfig(path, combined, logger);
  }

  public static getConfig(configDirname: string = ConfigPathResolver.getConfigDirname(), logger: Logger = Util.logger): { combined: SimpleMap<string>; outputs: ConfigOutput[] } {
    return loadConfig(configDirname, logger);
  }

  public static loadConfig(configDirname: string = ConfigPathResolver.getConfigDirname(), logger = Util.logger): { combined: SimpleMap<string>; outputs: ConfigOutput[] } | null {
    if (!Util.configLoaded) {
      Util.configLoaded = true;
      return loadConfig(configDirname, logger);
    } else {
      return null;
    }
  }

  public static checkEnvVariables(requiredEnvVariables: string[], defaults?: string[]): string[] {
    return checkEnvVariables(requiredEnvVariables, defaults);
  }

  public static parseOptions(
    name: string,
    arg: SimpleMap<SimpleTypes>,
    options: ParseOption[],
    mode: ParseOptionsMode = "no_extra"
  ): SimpleMap<SimpleTypes> {
    return parseOptions(name, arg, options, mode);
  }

  public static getLogger(identifier: string, formatter?: LoggerFormatter): Logger {
    return getLogger(identifier, formatter);
  }

  private static configLoaded = false;
}

Util.logger = Util.getLogger("Util");

import {ConfigPathResolver, LoadConfigOut, setServiceName, setupNodeEnv} from "./config";
import {getLogger, Logger, LoggerFormatter} from "./logger";
import {request} from "./request";
import {RequestOptions, RequestResponse} from "./request_common";
import {checkEnvVariables, ParseOption, parseOptions, ParseOptionsMode, SimpleMap, SimpleTypes} from "./option-parser";
import {loadConfig, initLoggerFactory} from "./loader";


export type ConfigOutput = SimpleMap<string>;

export abstract class Util {

  public static setupNodeEnv(): void {
    return setupNodeEnv();
  }

  public static async request(options: RequestOptions, logger?: Logger): Promise<RequestResponse> {
    return request(options, logger);
  }

  public static setServiceName(name: string): string {
    return setServiceName(name);
  }

  public static getConfig(configDirname: string = ConfigPathResolver.getConfigDirname(), logger?: Logger): LoadConfigOut {
    return loadConfig(configDirname, logger);
  }

  public static loadConfig(configDirname: string = ConfigPathResolver.getConfigDirname(), logger?: Logger): LoadConfigOut {
    return loadConfig(configDirname, logger);
  }

  public static initLoggerFactory(modulePath: string = ConfigPathResolver.getCustomLoggerFactoryPath(), logger?: Logger): void {
    return initLoggerFactory(modulePath, logger);
  }

  public static checkEnvVariables(requiredEnvVariables: string[], defaults?: string[]): string[] {
    return checkEnvVariables(requiredEnvVariables, defaults);
  }

  public static parseOptions(
    name: string,
    arg: SimpleMap<SimpleTypes>,
    options: ParseOption[],
    mode: ParseOptionsMode = "no_extra",
    ignoreUndefined = false,
  ): SimpleMap<SimpleTypes> {
    return parseOptions(name, arg, options, mode, ignoreUndefined);
  }

  public static getLogger(identifier: string, formatter?: LoggerFormatter): Logger {
    return getLogger(identifier, formatter);
  }
}

import { ConfigPathResolver, LoadConfigOut, setServiceName, setupNodeEnv } from "./config";
import { getLogger, Logger, LoggerFormatter, LoggerTransport } from "./logger";
import { request } from "./request";
import { RequestOptions, RequestResponse } from "./request_common";
import { checkEnvVariables, ParseOption, ParseOptionMap, parse, ParseOptionsMode, SimpleMap, SimpleTypes } from "./parser";
import { loadConfig } from "./loader";


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

  public static checkEnvVariables(requiredEnvVariables: string[], defaults?: string[]): string[] {
    return checkEnvVariables(requiredEnvVariables, defaults);
  }

  public static parseOptions(
    name: string,
    arg: SimpleMap<SimpleTypes>,
    options: ParseOption[] | ParseOptionMap,
    mode: ParseOptionsMode = "no_extra",
    ignoreUndefined = false,
  ): SimpleMap<SimpleTypes> {
    return Util.parse(name, arg, options, mode, ignoreUndefined);
  }

  public static parse(
    name: string,
    arg: SimpleMap<SimpleTypes>,
    options: ParseOption[] | ParseOptionMap,
    mode: ParseOptionsMode = "no_extra",
    ignoreUndefined = false,
  ): SimpleMap<SimpleTypes> {
    return parse(name, arg, options, mode, ignoreUndefined);
  }

  public static getLogger(identifier: string, options?: { formatter?: LoggerFormatter, transports?: LoggerTransport[] }, useCache = true): Logger {
    return getLogger(identifier, options, useCache);
  }
}

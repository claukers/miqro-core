import {ConfigPathResolver, loadConfig, overrideConfig} from "./config";
import {getComponentLogger, getLogger, Logger} from "./logger";
import {request, RequestOptions, RequestResponse} from "./request";
import {checkEnvVariables, checkModules, OPTIONPARSERType, parseOptions, SimpleMap, SimpleTypes} from "./option-parser";
import {setServiceName, setupInstanceEnv, setupSimpleEnv} from "./loader";


export type ConfigOutput = SimpleMap<string>;

export abstract class Util {

  public static logger: Logger;

  public static setupSimpleEnv(): void {
    return setupSimpleEnv();
  }

  public static async request(options: RequestOptions, logger: Logger = Util.logger): Promise<RequestResponse> {
    return request(options, logger);
  }

  public static setServiceName(name: string): string {
    return setServiceName(name);
  }

  public static setupInstanceEnv(serviceName: string, scriptPath: string, logger = Util.logger): void {
    return setupInstanceEnv(serviceName, scriptPath, logger);
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

  public static checkModules(requiredModules: string[]): void {
    return checkModules(requiredModules);
  }

  public static checkEnvVariables(requiredEnvVariables: string[]): void {
    return checkEnvVariables(requiredEnvVariables);
  }

  public static parseOptions(
    argName: string, arg: SimpleMap<SimpleTypes>,
    optionsArray: {
      name: string;
      type: string;
      arrayType?: string;
      required: boolean;
    }[],
    options: OPTIONPARSERType = "no_extra"
  ): SimpleMap<SimpleTypes> {
    return parseOptions(argName, arg, optionsArray, options);
  }

  public static getLogger(identifier: string | any): Logger {
    return getLogger(identifier);
  }

  public static getComponentLogger(component ?: string): Logger {
    return getComponentLogger(component);
  }

  private static configLoaded = false;
}

Util.logger = Util.getLogger("Util");

import {existsSync, readdirSync, readFileSync} from "fs";
import {dirname, extname, resolve} from "path";
import {ConfigPathResolver} from "./config";
import {ConfigFileNotFoundError, ParseOptionsError} from "./error/";
import {getLoggerFactory} from "./loader";
import {Logger} from "./logger";
import {ClientRequest, IncomingMessage, OutgoingHttpHeaders, request as httpRequest} from "http";
import {request as httpsRequest} from "https";
import {parse as urlParse} from "url";

// noinspection SpellCheckingInspection
export type OPTIONPARSERType = "remove_extra" | "add_extra" | "no_extra";
export type ParseSimpleType = "string" | "boolean" | "number" | "object" | "any";

const isParseSimpleOption = (type: string): boolean => {
  return ["string", "boolean", "number", "object", "any"].indexOf(type) !== -1;
};

const logContainer = new Map<string, Logger>();

const parseSimpleOption = (type: ParseSimpleType, value): boolean => {
  let isType;
  if (type === "any") {
    isType = true;
  } else if (type === "number") {
    value = parseInt(value, 10);
    isType = !isNaN(value);
  } else if (type === "boolean") {
    value = value === "true" || value === true ? true : value === "false" || value === false ? false : null;
    isType = value !== null;
  } else {
    isType = typeof value === type;
  }
  return isType;
};

export interface SimpleMap<T2> {
  [key: string]: T2;
}

export type ConfigOutput = SimpleMap<string>;

let logger = null;

export interface RequestOptions {
  url: string;
  method?: string;
  socketPath?: string;
  timeout?: number;
  headers?: OutgoingHttpHeaders;
  data?: SimpleMap<string | number | boolean> | string;
}

export abstract class Util {
  public static setupSimpleEnv(): void {
    process.env.NODE_ENV = process.env.NODE_ENV || "development";
  }

  public static async request(options: RequestOptions): Promise<{ status: number; response: IncomingMessage; data: any; request: ClientRequest; }> {
    return new Promise((resolve, reject) => {
      try {
        const url = urlParse(options.url);
        if (url.protocol === null) {
          url.protocol = "http:";
        }
        switch (url.protocol) {
          case "https:":
          case "http:":
            const requestModule = (url.protocol === "https:" ? httpsRequest : httpRequest);
            const req: ClientRequest = requestModule({
              agent: false,
              path: url.path,
              socketPath: options.socketPath,
              headers: options.headers,
              timeout: options.timeout,
              hostname: url.hostname,
              port: url.port
            }, (res) => {
              let data = "";
              const chunkListener = (chunk) => {
                data += chunk;
              };
              const errorListener = (e2) => {
                res.removeListener("data", chunkListener);
                res.removeListener("end", endListener);
                reject(e2);
              };
              const endListener = () => {
                res.removeListener("data", chunkListener);
                res.removeListener("error", errorListener);
                const contentType = res.headers["content-type"];
                if (contentType.indexOf("application/json") === 0 || contentType.indexOf("json") === 0) {
                  data = JSON.parse(data);
                }
                const status = res.statusCode;
                if (status >= 200 && status < 300) {
                  resolve({
                    response: res,
                    status,
                    request: req,
                    data
                  });
                } else {
                  const err = new Error(`request ended with status [${status}]`);
                  (err as any).response = res;
                  (err as any).status = status;
                  (err as any).request = req;
                  (err as any).data = data;
                  reject(err);
                }
              }
              try {
                res.on("data", chunkListener);
                res.once("error", errorListener)
                res.once("end", endListener);
              } catch (e3) {
                res.removeListener("data", chunkListener);
                res.removeListener("end", endListener);
                res.removeListener("error", errorListener);
                reject(e3);
              }
            });
            if (options.data) {
              req.write(typeof options.data === "string" ? options.data : JSON.stringify(options.data));
            }
            req.end();
            break;
          default:
            reject(new Error(`unknown protocol [${url.protocol}]`))
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  public static setupInstanceEnv(serviceName: string, scriptPath: string): void {
    const microDirname = resolve(dirname(scriptPath));
    if (!
      process.env.MIQRO_DIRNAME || process.env.MIQRO_DIRNAME === "undefined"
    ) {
      process.env.MIQRO_DIRNAME = microDirname;
    } else {
      // noinspection SpellCheckingInspection
      logger.warn(`NOT changing to MIQRO_DIRNAME[${microDirname}] because already defined as ${process.env.MIQRO_DIRNAME}!`);
    }
    process.chdir(microDirname);
    process.env.MICRO_NAME = serviceName;
    Util.setupSimpleEnv();
  }

  public static overrideConfig(path: string, combined ?: SimpleMap<string>): ConfigOutput[] {
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
  }

  public static getConfig(): { combined: SimpleMap<string>; outputs: ConfigOutput[] } {
    const overridePath = ConfigPathResolver.getOverrideConfigFilePath();

    let outputs: ConfigOutput[] = [];
    const combined = {};

    const configDirname = ConfigPathResolver.getConfigDirname();
    if (existsSync(configDirname)) {
      const configFiles = readdirSync(configDirname);
      for (const configFile of configFiles) {
        const configFilePath = resolve(configDirname, configFile);
        const ext = extname(configFilePath);
        if (ext === ".env") {
          logger.debug(`loading ${configFilePath}`);
          outputs = outputs.concat(Util.overrideConfig(configFilePath, combined));
        }
      }

      if (configFiles.length === 0) {
        logger.debug(`Util.loadConfig nothing loaded [${configDirname}] env files dont exist! Maybe you miss to run miqro-core init.`);
      }
    } else {
      logger.debug(`Util.loadConfig nothing loaded [${configDirname}] dirname dont exist! Maybe you miss to run miqro-core init.`);
    }

    if (overridePath && existsSync(overridePath)) {
      outputs = outputs.concat(Util.overrideConfig(overridePath, combined));
    } else if (overridePath) {
      logger.warn(`nothing loaded from [${process.env.MIQRO_OVERRIDE_CONFIG_PATH}] env file doesnt exists!`);
    }
    return {combined, outputs};
  }

  public static loadConfig(): void {
    if (!
      Util.configLoaded
    ) {
      Util.getConfig();
      Util.configLoaded = true;
    }
  }

  public static checkModules(requiredModules: string[]): void {
    requiredModules.forEach((module) => {
      try {
        require(module);
      } catch (e) {
        throw new ConfigFileNotFoundError(`module [${module}] not installed!. [${e.message}].`);
      }
    });
  }

  public static checkEnvVariables(requiredEnvVariables: string[]): void {
    requiredEnvVariables.forEach((envName) => {
      if (process.env[envName] === undefined) {
        throw new Error(`Env variable [${envName}!] not defined. Consider adding it to a env file located in [${ConfigPathResolver.getConfigDirname()}].`);
      }
    });
  }

  public static parseOptions(
    argName: string, arg:
      {
        [name: string]: any
      },
    optionsArray: {
      name: string;
      type: string;
      arrayType?: string;
      required: boolean;
    }[],
    parserOption: OPTIONPARSERType = "no_extra"
  ): SimpleMap<any> {
    const ret = {};
    if (typeof arg !== "object" || !arg
    ) {
      throw new ParseOptionsError(`${argName} not valid`);
    }
    const undefinedCount = 0;
    optionsArray.forEach((patchAttr) => {
      const name = patchAttr.name;
      const type = patchAttr.type;
      const arrayType = patchAttr.arrayType;
      const required = patchAttr.required;
      const value = arg[name];
      let isType;
      if (isParseSimpleOption(type)) {
        const sType = type as ParseSimpleType;
        isType = parseSimpleOption(sType, value);
      } else if (type === "array") {
        isType = value instanceof Array && isParseSimpleOption(arrayType);
        if (isType) {
          value.forEach((valueItem) => {
            const sType = arrayType as ParseSimpleType;
            isType = isType && parseSimpleOption(sType, valueItem);
          });
        }
      } else {
        isType = false;
      }
      if (value === undefined && required) {
        throw new ParseOptionsError(`${argName}.${name} not defined`);
      } else if (value !== undefined && !isType) {
        throw new ParseOptionsError(`${argName}.${name} not ${type}`);
      } else if (value !== undefined) {
        ret[name] = arg[name];
      }
    });
    const argKeys = Object.keys(arg);
    const retKeys = Object.keys(ret);
    if (retKeys.length === argKeys.length - undefinedCount) {
      return ret;
    } else {
      if (parserOption === "remove_extra") {
        return ret;
      } else if (parserOption === "add_extra") {
        return arg;
      } else if (parserOption === "no_extra") {
        retKeys.forEach((key) => {
          const index = argKeys.indexOf(key);
          if (index !== -1) {
            argKeys.splice(index, 1);
          }
        });
        const extraKey = argKeys[0];
        throw new ParseOptionsError(`${argName} options not valid [${extraKey}]`);
      }
    }
  }

  public static getLogger(identifier: string): Logger {
    if (typeof identifier !== "string") {
      throw new Error("Bad log identifier");
    }
    if (!logContainer.has(identifier)) {
      const factory = getLoggerFactory();
      logContainer.set(identifier, factory(identifier));
    }
    return logContainer.get(identifier);
  }

  public static getComponentLogger(component ?: string): Logger {
    const serviceName = ConfigPathResolver.getServiceName();
    return Util.getLogger(`${serviceName ? `${serviceName}${component ? "." : ""}` : ""}${component ? component : ""}`);
  }

  private static configLoaded = false;
}

logger = Util.getLogger("Util");

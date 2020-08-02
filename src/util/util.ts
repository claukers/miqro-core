import {existsSync, readdirSync, readFileSync} from "fs";
import {dirname, extname, resolve} from "path";
import {ConfigPathResolver} from "./config";
import {ConfigFileNotFoundError, ParseOptionsError} from "./error/";
import {getLoggerFactory} from "./loader";
import {Logger} from "./logger";
import {ClientRequest, IncomingHttpHeaders, IncomingMessage, OutgoingHttpHeaders, request as httpRequest} from "http";
import {request as httpsRequest} from "https";
import {format as formatUrl, parse as urlParse} from "url";
import {NamedError} from "./error/named";

export class ResponseError extends NamedError {
  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  constructor(
    public readonly status: number | undefined,
    public readonly response: IncomingMessage | undefined,
    public readonly headers: IncomingHttpHeaders | undefined,
    public readonly url: string,
    public readonly redirectedUrl: string | null,
    public readonly data: any,
  ) {
    super(`request ended with ${status ? `status [${status}]` : "no status"}`);
    this.name = "ResponseError";
  }
}

const MISSED_CONFIG = (path: string): string => `nothing loaded from [${path}] env file doesnt exists!`;
const MISSED_TO_RUNMIQRO_INIT = (configDirname: string): string => `Util.loadConfig nothing loaded [${configDirname}] env files dont exist! Maybe you miss to run miqro-core init.`;

// noinspection SpellCheckingInspection
export type OPTIONPARSERType = "remove_extra" | "add_extra" | "no_extra";
export type SimpleTypes = string | boolean | number | Array<SimpleTypes> | SimpleMap<SimpleTypes>;
export type ParseSimpleType = "string" | "boolean" | "number" | "object" | "any";

const isOPTIONPARSERType = (type: string | any): boolean => {
  return ["remove_extra", "add_extra", "no_extra"].indexOf(type) !== -1;
}

const isParseSimpleOption = (type: string | any): boolean => {
  return ["string", "boolean", "number", "object", "any"].indexOf(type) !== -1;
};

const logContainer = new Map<string, Logger>();

const parseSimpleOption = (type: ParseSimpleType, value: any): boolean => {
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

export interface RequestOptions {
  url: string;
  method?: string;
  socketPath?: string;
  ignoreRedirect?: boolean;
  timeout?: number;
  headers?: OutgoingHttpHeaders;
  data?: any;
}

export abstract class Util {

  public static logger: Logger;

  public static setupSimpleEnv(): void {
    process.env.NODE_ENV = process.env.NODE_ENV || "development";
  }

  public static async request(options: RequestOptions, logger?: Logger): Promise<{ url: string; redirectedUrl: string | null; headers: IncomingHttpHeaders, status: number; response: IncomingMessage; data: any; request: ClientRequest; }> {
    if (!logger) {
      logger = Util.logger;
    }
    if (options.method?.toLowerCase() === "get" && options.data !== undefined) {
      return Promise.reject(new Error("cannot send data on method get"));
    } else {
      return new Promise((resolve, reject) => {
        try {
          const isJSON: boolean = typeof options.data !== "string";
          const data = options.data ? !isJSON ? options.data : JSON.stringify(options.data) : undefined;
          const contentLength = data ? data.length : 0;
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
                method: options.method,
                socketPath: options.socketPath,
                headers: {
                  ["User-Agent"]: "curl",
                  ...options.headers,
                  ["Content-Length"]: contentLength
                },
                timeout: options.timeout,
                hostname: url.hostname,
                port: url.port
              }, (res) => {
                let data: any = "";
                const chunkListener = (chunk: any) => {
                  data += chunk;
                };
                const errorListener = (e2: Error) => {
                  res.removeListener("data", chunkListener);
                  res.removeListener("end", endListener);
                  reject(e2);
                };
                const endListener = () => {
                  res.removeListener("data", chunkListener);
                  res.removeListener("error", errorListener);
                  const contentType = res.headers["content-type"];

                  if (contentType && (contentType.indexOf("application/json") === 0 || contentType.indexOf("json") === 0)) {
                    data = JSON.parse(data);
                  }
                  const status = res.statusCode;
                  if (!status) {
                    const err = new ResponseError(status, res, res.headers, options.url, null, data);
                    reject(err);
                  } else {

                    if (status >= 300 && status <= 400 && !options.ignoreRedirect && res.headers["location"]) {
                      let location = res.headers["location"];
                      try {
                        const loURL = urlParse(location);
                        if (!loURL.hostname && url.hostname) {
                          // missing hostname on redirect so same hostname protocol and port?
                          loURL.hostname = url.hostname;
                          loURL.port = url.port;
                          loURL.path = url.path;
                          loURL.protocol = url.protocol;
                          location = formatUrl(loURL);
                        }

                        (logger as Logger).debug(`redirecting to [${location}] from [${options.url}]`);
                        Util.request({
                          ...options,
                          url: location
                        }).then((ret) => {
                          const redirectedUrl = ret.url;
                          resolve({
                            ...ret,
                            url: options.url,
                            redirectedUrl
                          });
                        }).catch((e4: any) => {
                          if (e4.response && e4.status && e4.headers && e4.data) {
                            const err = new ResponseError(e4.status, e4.response, e4.headers, options.url, location, e4.data);
                            err.stack = e4.stack;
                            reject(err);
                          } else {
                            (e4 as any).redirectedUrl = location;
                            (e4 as any).url = options.url;
                            reject(e4);
                          }
                        });
                      } catch (e5) {
                        reject(new ResponseError(status, res, res.headers, options.url, location, data));
                      }
                    } else {
                      if (status >= 200 && status < 300) {
                        resolve({
                          url: options.url,
                          response: res,
                          status,
                          redirectedUrl: null,
                          headers: res.headers,
                          request: req,
                          data
                        });
                      } else {
                        const err = new ResponseError(status, res, res.headers, options.url, null, data);
                        reject(err);
                      }
                    }
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
              req.once("error", (e: Error) => {
                if ((e as any).code === "ECONNREFUSED") {
                  e.name = "ResponseConnectionRefusedError";
                }
                reject(e);
              });
              req.end(data);
              break;
            default:
              reject(new Error(`unknown protocol [${url.protocol}]`))
          }
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  public static setServiceName(name: string): string {
    process.env.MIQRO_SERVICE_NAME = name;
    return process.env.MIQRO_SERVICE_NAME;
  }

  public static setupInstanceEnv(serviceName: string, scriptPath: string): void {
    const microDirname = resolve(dirname(scriptPath));
    if (!
      process.env.MIQRO_DIRNAME || process.env.MIQRO_DIRNAME === "undefined"
    ) {
      process.env.MIQRO_DIRNAME = microDirname;
    } else {
      // noinspection SpellCheckingInspection
      Util.logger.warn(`NOT changing to MIQRO_DIRNAME [${microDirname}] because already defined as ${process.env.MIQRO_DIRNAME}!`);
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
      Util.logger.debug(`overriding config with [${path}].`);
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
          Util.logger.debug(`loading ${configFilePath}`);
          outputs = outputs.concat(Util.overrideConfig(configFilePath, combined));
        }
      }

      if (configFiles.length === 0) {
        Util.logger.debug(MISSED_TO_RUNMIQRO_INIT(configDirname));
      }
    } else {
      Util.logger.debug(MISSED_TO_RUNMIQRO_INIT(configDirname));
    }

    if (overridePath && existsSync(overridePath)) {
      outputs = outputs.concat(Util.overrideConfig(overridePath, combined));
    } else if (overridePath) {
      Util.logger.warn(MISSED_CONFIG(overridePath));
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
        throw new ConfigFileNotFoundError(`module [${module}] not found!. [${e.message}].`);
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
    argName: string, arg: SimpleMap<SimpleTypes>,
    optionsArray: {
      name: string;
      type: string;
      arrayType?: string;
      required: boolean;
    }[],
    parserOption: OPTIONPARSERType = "no_extra"
  ): SimpleMap<SimpleTypes> {
    const ret: SimpleMap<SimpleTypes> = {};
    if (typeof arg !== "object" || !arg) {
      throw new ParseOptionsError(`${argName} not valid`);
    }
    if (!isOPTIONPARSERType(parserOption)) {
      throw new ParseOptionsError(`parserOption [${parserOption}] not valid!`);
    }
    const undefinedCount = 0;
    for (const patchAttr of optionsArray) {
      const name = patchAttr.name;
      const type = patchAttr.type;
      const arrayType = patchAttr.arrayType;
      const required = patchAttr.required;
      const value = arg[name];
      let isType: boolean;
      if (isParseSimpleOption(type)) {
        const sType = type as ParseSimpleType;
        isType = parseSimpleOption(sType, value);
      } else if (type === "array") {
        isType = value instanceof Array && isParseSimpleOption(arrayType);
        if (isType) {
          for (const valueItem of (value as Array<any>)) {
            const sType = arrayType as ParseSimpleType;
            isType = isType && parseSimpleOption(sType, valueItem);
            if (!isType) {
              break;
            }
          }
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
    }
    const argKeys = Object.keys(arg);
    const retKeys = Object.keys(ret);
    if (retKeys.length === argKeys.length - undefinedCount) {
      return ret;
    } else {
      if (parserOption === "remove_extra") {
        return ret;
      } else if (parserOption === "add_extra") {
        return arg;
      } else {
        // no extra
        for (const key of retKeys) {
          const index = argKeys.indexOf(key);
          if (index !== -1) {
            argKeys.splice(index, 1);
          }
        }
        const extraKey = argKeys[0];
        throw new ParseOptionsError(`${argName} option not valid [${extraKey}]`)
      }
    }
  }

  public static getLogger(identifier: string | any): Logger {
    if (typeof identifier !== "string") {
      throw new Error("Bad log identifier");
    }
    if (logContainer.has(identifier)) {
      return logContainer.get(identifier) as Logger;
    } else {
      const factory = getLoggerFactory();
      const logger = factory(identifier);
      logContainer.set(identifier, logger);
      return logger;
    }
  }

  public static getComponentLogger(component ?: string): Logger {
    const serviceName = ConfigPathResolver.getServiceName();
    return Util.getLogger(`${serviceName ? `${serviceName}${component ? "." : ""}` : ""}${component ? component : ""}`);
  }

  private static configLoaded = false;
}

Util.logger = Util.getLogger("Util");

import * as crypto from "crypto";
import {config} from "dotenv";
import * as fs from "fs";
import * as path from "path";
import * as winston from "winston";
import {ConfigPathResolver} from "./config";
import {ConfigFileNotFoundError, ParseOptionsError} from "./error/";
import {winstonConfig} from "./loader";
import {templates} from "./templates";

const logContainer = new winston.Container();

// noinspection SpellCheckingInspection
export type IOPTIONPARSER = "remove_extra" | "add_extra" | "no_extra";
export type IParseSimpleType = "string" | "boolean" | "number" | "object" | "any";
export type IParseType = "string" | "boolean" | "number" | "array" | "any";

const isParseSimpleOption = (type: string): boolean => {
  return ["string", "boolean", "number", "object", "any"].indexOf(type) !== -1;
};

const parseSimpleOption = (type: IParseSimpleType, value): boolean => {
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

export interface ISimpleMap<T2> {
  [word: string]: T2;
}

export abstract class Util {
  public static sha256 = (data) => crypto.createHash("sha256").update(data, "utf8").digest("base64");

  public static setupSimpleEnv() {
    process.env.NODE_ENV = process.env.NODE_ENV || "development";
  }

  public static setupInstanceEnv(serviceName: string, scriptPath: string) {
    const microDirname = path.resolve(path.dirname(scriptPath));
    if (!process.env.MIQRO_DIRNAME || process.env.MIQRO_DIRNAME === "undefined") {
      process.env.MIQRO_DIRNAME = microDirname;
    } else {
      logger.warn(`NOT changing to MIQRO_DIRNAME[${microDirname}] because already defined as ${process.env.MIQRO_DIRNAME}!`);
    }
    process.chdir(microDirname);
    process.env.MICRO_NAME = serviceName;
    Util.setupSimpleEnv();
  }

  public static loadConfig(initEnv?: boolean) {
    if (!Util.configLoaded) {
      Util.setupSimpleEnv();
      const configFolder = ConfigPathResolver.getConfigDirname();
      const configPath = ConfigPathResolver.getConfigFilePath();
      if (!fs.existsSync(configPath)) {
        if (!initEnv) {
          logger.warn(`Util.loadConfig nothing loaded [${configPath}] env file doesnt exists! Maybe you miss to run miqro-core init.`);
        } else {
          logger.warn(`[${configPath}] env file doesnt exists!`);
          if (!fs.existsSync(configFolder)) {
            fs.mkdirSync(configFolder);
          }
          logger.warn(`creating a new ${configPath} env file`);
          fs.writeFileSync(configPath, templates.defaultEnvFile);

          // noinspection SpellCheckingInspection
          const gitignorePath = path.resolve(ConfigPathResolver.getBaseDirname(), ".gitignore");
          // noinspection SpellCheckingInspection
          if (!fs.existsSync(gitignorePath)) {
            fs.writeFileSync(gitignorePath, templates.gitignore);
            logger.warn(`creating ${gitignorePath} file`);
          }

          config({
            path: configPath
          });
        }
      } else {
        logger.info(`loading ${configPath}`);
        config({
          path: configPath
        });
      }
      Util.configLoaded = true;
    }
  }

  public static checkEnvVariables(requiredEnvVariables: string[]) {
    requiredEnvVariables.forEach((envName) => {
      if (process.env[envName] === undefined) {
        throw new Error(`Env variable [${envName}!] not defined. Consider adding it to [${ConfigPathResolver.getConfigFilePath()}].`);
      }
    });
  }

  public static parseOptions(argName,
                             arg: { [name: string]: any },
                             optionsArray: Array<{
                               name: string, type: string, arrayType?: string, required: boolean
                             }>,
                             parserOption: IOPTIONPARSER = "no_extra"): { [name: string]: any } {
    const ret = {};
    if (typeof arg !== "object" || !arg) {
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
        const sType = type as IParseSimpleType;
        isType = parseSimpleOption(sType, value);
      } else if (type === "array") {
        isType = value instanceof Array && isParseSimpleOption(arrayType);
        if (isType) {
          value.forEach((valueItem) => {
            const sType = arrayType as IParseSimpleType;
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

  public static getLogger(identifier: string) {
    if (typeof identifier !== "string") {
      throw new Error("Bad log identifier");
    }
    if (!logContainer.has(identifier)) {
      const configMaker = winstonConfig();
      const configO = configMaker(identifier);
      logContainer.add(identifier, configO);
    }
    const loggerO = logContainer.get(identifier);
    (loggerO as any).stream = {
      write: (message) => {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        loggerO.info(message.trim());
      }
    };
    return loggerO;
  }

  private static configLoaded: boolean = false;
}

const logger = Util.getLogger("Util");

import {ConfigFileNotFoundError, ParseOptionsError} from "./error";
import {ConfigPathResolver} from "./config";

// noinspection SpellCheckingInspection
export type OPTIONPARSERType = "remove_extra" | "add_extra" | "no_extra";
export type SimpleTypes = string | boolean | number | Array<SimpleTypes> | SimpleMap<SimpleTypes>;
export type ParseSimpleType = "string" | "boolean" | "number" | "object" | "any";

export interface SimpleMap<T2> {
  [key: string]: T2;
}

const isOPTIONPARSERType = (type: string | any): boolean => {
  return ["remove_extra", "add_extra", "no_extra"].indexOf(type) !== -1;
}

const isParseSimpleOption = (type: string | any): boolean => {
  return ["string", "boolean", "number", "object", "any"].indexOf(type) !== -1;
};


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

export const parseOptions = (
  argName: string, arg: SimpleMap<SimpleTypes>,
  optionsArray: {
    name: string;
    type: string;
    arrayType?: string;
    required: boolean;
  }[],
  parserOption: OPTIONPARSERType = "no_extra"
): SimpleMap<SimpleTypes> => {
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
};


export const checkEnvVariables = (requiredEnvVariables: string[]): void => {
  requiredEnvVariables.forEach((envName) => {
    if (process.env[envName] === undefined) {
      throw new Error(`Env variable [${envName}!] not defined. Consider adding it to a env file located in [${ConfigPathResolver.getConfigDirname()}].`);
    }
  });
};

export const checkModules = (requiredModules: string[]): void => {
  requiredModules.forEach((module) => {
    try {
      require(module);
    } catch (e) {
      throw new ConfigFileNotFoundError(`module [${module}] not found!. [${e.message}].`);
    }
  });
};
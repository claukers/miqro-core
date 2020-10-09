import {ConfigPathResolver} from "./config";
import {ParseOptionsError} from "./error";

// noinspection SpellCheckingInspection
export type OPTIONPARSERType = "remove_extra" | "add_extra" | "no_extra";
export type SimpleTypes = string | boolean | number | Array<SimpleTypes> | SimpleMap<SimpleTypes>;
export type ParseSimpleType = "string" | "boolean" | "number" | "object" | "any" | "nested" | "array";

export interface SimpleMap<T2> {
  [key: string]: T2;
}

const isOPTIONPARSERType = (type: string | any): boolean => {
  return ["remove_extra", "add_extra", "no_extra"].indexOf(type) !== -1;
}

const isParseSimpleOption = (type: string | any): boolean => {
  return ["string", "boolean", "number", "object", "any"].indexOf(type) !== -1;
};

export interface NestedParseOption {
  optionsArray: ParseOption[];
  parserOption: OPTIONPARSERType;
}

export interface ParseOption {
  name: string;
  type: ParseSimpleType;
  arrayType?: ParseSimpleType;
  nestedOptions?: NestedParseOption;
  required: boolean;
}


const isValueType = (name: string, attrName: string, type: ParseSimpleType, value: any, arrayType?: ParseSimpleType, nestedOptions?: NestedParseOption): { isType: boolean; parsedValue: any; } => {
  switch (type) {
    case "nested":
      if (!nestedOptions) {
        throw new ParseOptionsError(`unsupported type ${type} without nestedOptions`);
      }
      let pValue = parseOptions(`${name}.${attrName}`, value, nestedOptions.optionsArray, nestedOptions.parserOption);
      return {
        isType: pValue !== null,
        parsedValue: pValue === null ? value : pValue
      }
    case "array":
      const parsedList: SimpleTypes[] = [];
      let isType = value instanceof Array;
      if (isType) {
        switch (arrayType) {
          case undefined:
            for (const v of value) {
              parsedList.push(v);
            }
            break;
          default:
            for (let i = 0; i < value.length; i++) {
              const v = value[i];
              const aiType = isValueType(`${name}.${attrName}`, `[${i}]`, arrayType, v, undefined, nestedOptions)
              if (!aiType.isType) {
                isType = false;
                break;
              } else {
                parsedList.push(aiType.parsedValue);
              }
            }
            break;
        }
      }
      return {
        isType,
        parsedValue: isType ? parsedList : value
      };
    case "any":
      return {
        isType: true,
        parsedValue: value
      };
    case "number":
      return {
        isType: !isNaN(value),
        parsedValue: !isNaN(value) ? parseInt(value, 10) : value
      };
    case "boolean":
      const parsedValue = value === "true" || value === true ? true : value === "false" || value === false ? true : null;
      return {
        isType: parsedValue !== null,
        parsedValue: parsedValue !== null ? parsedValue : value
      };
    case "string":
    case "object":
      return {
        isType: typeof value === type,
        parsedValue: value
      };
    default:
      throw new ParseOptionsError(`unsupported type ${type}`);
  }
};

export const parseOptions = (
  argName: string, arg: SimpleMap<SimpleTypes>,
  optionsArray: ParseOption[],
  parserOption: OPTIONPARSERType = "no_extra"
): SimpleMap<SimpleTypes> => {
  const ret: SimpleMap<SimpleTypes> = {};
  // throw new ParseOptionsError(`${argName}.${name} not ${type}`);
  // throw new ParseOptionsError(`${argName}.${name} not defined`);
  for (const option of optionsArray) {
    const value = arg[option.name];
    const exists = arg.hasOwnProperty(option.name);
    if (!exists && !option.required) {
      continue;
    } else if (value === undefined && option.required) {
      throw new ParseOptionsError(`${argName}.${option.name} not defined`);
    }
    const {isType, parsedValue} = isValueType(argName, option.name, option.type, value, option.arrayType, option.nestedOptions);
    if (!isType) {
      throw new ParseOptionsError(`${argName}.${option.name} not ${option.type}${option.type === "array" && option.arrayType ? ` of ${option.arrayType}` : (option.type === "nested" ? " as defined!" : "")}`);
    }
    ret[option.name] = parsedValue;
  }
  switch (parserOption) {
    case "no_extra":
      const argKeys = Object.keys(arg);
      const hasExtra = Object.keys(ret).length !== argKeys.length;
      if (hasExtra) {
        for (const argKey of argKeys) {
          if (!ret.hasOwnProperty(argKey)) {
            throw new ParseOptionsError(`${argName} option not valid [${argKey}]`);
          }
        }
      }
      return ret;
    case "add_extra":
      return {
        ...arg,
        ...ret
      };
    case "remove_extra":
      return ret;
    default:
      throw new ParseOptionsError(`unsupported parserOption ${parserOption}`);
  }
};


export const checkEnvVariables = (requiredEnvVariables: string[], defaults?: string[]): string[] => {
  if (defaults && defaults.length !== requiredEnvVariables.length) {
    throw new Error(`defaults cannot be a different length of requiredEnvVariabled`);
  }
  return requiredEnvVariables.map((envName, index) => {
    if (process.env[envName] === undefined && !defaults) {
      throw new Error(`Env variable [${envName}!] not defined. Consider adding it to a env file located in [${ConfigPathResolver.getConfigDirname()}].`);
    } else if (process.env[envName] === undefined && defaults) {
      return defaults[index];
    } else {
      return process.env[envName] as string;
    }
  });
};

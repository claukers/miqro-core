import {ConfigPathResolver} from "./config";
import {ParseOptionsError} from "./error";

export type ParseOptionsMode = "remove_extra" | "add_extra" | "no_extra";
export type SimpleTypes = string | boolean | number | Array<SimpleTypes> | SimpleMap<SimpleTypes>;
export type ParseSimpleType = "string" | "boolean" | "number" | "object" | "any" | "nested" | "array" | "enum";

export interface SimpleMap<T2> {
  [key: string]: T2;
}

export interface NestedParseOption {
  options: ParseOption[];
  mode: ParseOptionsMode;
}

export interface ParseOption {
  name: string;
  type: ParseSimpleType;
  arrayType?: ParseSimpleType;
  nestedOptions?: NestedParseOption;
  enumValues?: string[];
  required: boolean;
}

const isValueType = (name: string, attrName: string, type: ParseSimpleType, value: any, arrayType?: ParseSimpleType, nestedOptions?: NestedParseOption, enumValues?: string[]): { isType: boolean; parsedValue: any; } => {
  switch (type) {
    case "nested":
      if (!nestedOptions) {
        throw new ParseOptionsError(`unsupported type ${type} without nestedOptions`);
      }
      const pValue = parseOptions(`${name}.${attrName}`, value, nestedOptions.options, nestedOptions.mode);
      return {
        isType: pValue !== null,
        parsedValue: pValue === null ? value : pValue
      }
    case "array":
      const parsedList: SimpleTypes[] = [];
      let isType = value instanceof Array;
      if (isType) {
        if (arrayType === undefined) {
          for (const v of value) {
            parsedList.push(v);
          }
        } else {
          for (let i = 0; i < value.length; i++) {
            const v = value[i];
            const aiType = isValueType(`${name}.${attrName}`, `[${i}]`, arrayType, v, undefined, nestedOptions, enumValues)
            if (!aiType.isType) {
              isType = false;
              break;
            } else {
              parsedList.push(aiType.parsedValue);
            }
          }
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
    case "enum":
      const enumCheck = isValueType(`${name}.${attrName}`, `enumList`, "array", enumValues, "string");
      if (enumCheck.isType && enumValues) {
        enumCheck.isType = enumValues.indexOf(value) !== -1;
      } else {
        throw new ParseOptionsError(`options.enumList not a string array`);
      }
      return {
        isType: enumCheck.isType,
        parsedValue: value
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
  name: string,
  arg: SimpleMap<SimpleTypes>,
  options: ParseOption[],
  mode: ParseOptionsMode = "no_extra"
): SimpleMap<SimpleTypes> => {
  const ret: SimpleMap<SimpleTypes> = {};
  // throw new ParseOptionsError(`${argName}.${name} not ${type}`);
  // throw new ParseOptionsError(`${argName}.${name} not defined`);
  if (!arg || typeof arg !== "object") {
    throw new ParseOptionsError(`invalid ${name}`);
  }
  for (const option of options) {
    const value = arg[option.name];
    const exists = arg.hasOwnProperty(option.name);
    if (!exists && !option.required) {
      continue;
    } else if (!exists && option.required) {
      throw new ParseOptionsError(`${name}.${option.name} not defined`);
    }
    const {isType, parsedValue} = isValueType(name, option.name, option.type, value, option.arrayType, option.nestedOptions, option.enumValues);
    if (!isType) {
      throw new ParseOptionsError(`${name}.${option.name} not ${option.type}${option.type === "array" && option.arrayType ? ` of ${option.arrayType}` : (option.type === "nested" ? " as defined!" : "")}`);
    }
    ret[option.name] = parsedValue;
  }
  switch (mode) {
    case "no_extra":
      const argKeys = Object.keys(arg);
      const hasExtra = Object.keys(ret).length !== argKeys.length;
      if (hasExtra) {
        for (const argKey of argKeys) {
          if (!ret.hasOwnProperty(argKey)) {
            throw new ParseOptionsError(`${name} option not valid [${argKey}]`);
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
      throw new ParseOptionsError(`unsupported mode ${mode}`);
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

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

export interface ParseOption extends ParseOptionValueType {
  name: string;
  required: boolean;
  description?: string;
  defaultValue?: any;
}

export interface ParseOptionValueType {
  type: ParseSimpleType;
  arrayType?: ParseSimpleType;
  arrayMinLength?: number;
  arrayMaxLength?: number;
  numberMax?: number;
  numberMin?: number;
  stringMaxLength?: number;
  stringMinLength?: number;
  nestedOptions?: NestedParseOption;
  enumValues?: string[];
  parseJSON?: boolean;
}

interface IsValueTypeArgs extends ParseOptionValueType {
  name: string;
  attrName: string;
  value: any;
}

const isValueType = (
  {
    name,
    attrName,
    type,
    value,
    arrayType,
    nestedOptions,
    enumValues,
    parseJSON,
    arrayMinLength,
    arrayMaxLength,
    numberMax,
    numberMin,
    stringMaxLength,
    stringMinLength
  }: IsValueTypeArgs): { isType: boolean; parsedValue: any; } => {

  if (parseJSON) {
    if (typeof value !== "string") {
      throw new ParseOptionsError(`parseJSON not available to non string value`);
    }
    try {
      value = JSON.parse(value);
    } catch (e) {
      throw new ParseOptionsError(`value not json!`);
    }
  }

  switch (type) {
    case "nested":
      if (!nestedOptions) {
        throw new ParseOptionsError(`unsupported type ${type} without nestedOptions`);
      }
      const pValue = parseOptions(`${name}.${attrName}`, value, nestedOptions.options, nestedOptions.mode);
      return {
        isType: pValue !== null,
        parsedValue: pValue === null ? value : pValue
      };
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
            const aiType = isValueType({
              name: `${name}.${attrName}`,
              attrName: `[${i}]`,
              type: arrayType,
              value: v,
              numberMin,
              numberMax,
              stringMinLength,
              stringMaxLength,
              nestedOptions,
              enumValues,
              arrayMaxLength,
              arrayMinLength
            });
            if (!aiType.isType) {
              isType = false;
              break;
            } else {
              parsedList.push(aiType.parsedValue);
            }
          }
        }
      }
      if (isType && arrayMinLength !== undefined && parsedList.length < arrayMinLength) {
        isType = false;
      }
      if (isType && arrayMaxLength !== undefined && parsedList.length > arrayMaxLength) {
        isType = false;
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
    case "number": {
      let isType = !isNaN(value);
      const parsedValue = isType ? parseInt(value, 10) : value;
      if (isType && numberMin !== undefined && parsedValue <= numberMin) {
        isType = false;
      }
      if (isType && numberMax !== undefined && parsedValue > numberMax) {
        isType = false;
      }
      return {
        isType,
        parsedValue
      };
    }
    case "boolean":
      const parsedValue = value === "true" || value === true ? true : value === "false" || value === false ? false : null;
      return {
        isType: parsedValue !== null,
        parsedValue: parsedValue !== null ? parsedValue : value
      };
    case "enum":
      const enumCheck = isValueType({
        name: `${name}.${attrName}`,
        attrName: `enumList`,
        type: "array",
        value: enumValues,
        arrayType: "string"
      });
      if (enumCheck.isType && enumValues && enumValues.length > 0) {
        enumCheck.isType = enumValues.indexOf(value) !== -1;
      } else {
        throw new ParseOptionsError(`options.enumValues not a string array`);
      }
      return {
        isType: enumCheck.isType,
        parsedValue: value
      };
    case "string":{
      let isType = typeof value === type;
      const parsedValue = value;
      if (isType && stringMinLength !== undefined && parsedValue.length <= stringMinLength) {
        isType = false;
      }
      if (isType && stringMaxLength !== undefined && parsedValue.length > stringMaxLength) {
        isType = false;
      }
      return {
        isType,
        parsedValue
      };
    }
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
  mode: ParseOptionsMode = "no_extra",
  ignoreUndefined = false
): SimpleMap<SimpleTypes> => {
  const ret: SimpleMap<SimpleTypes> = {};
  if (!arg || typeof arg !== "object") {
    throw new ParseOptionsError(`invalid ${name}`, name);
  }
  for (const option of options) {
    const value = arg[option.name];
    if(value === undefined && option.defaultValue !== undefined) {
      ret[option.name] = option.defaultValue;
      continue;
    }
    const exists = ignoreUndefined ? value !== undefined : arg.hasOwnProperty(option.name);
    if (!exists && !option.required) {
      continue;
    } else if (!exists && option.required) {
      throw new ParseOptionsError(`${name}.${option.name} not defined`, `${name}.${option.name}`);
    }
    const {isType, parsedValue} = isValueType({
      name,
      attrName: option.name,
      type: option.type,
      value: value,
      numberMin: option.numberMin,
      numberMax: option.numberMax,
      stringMinLength: option.stringMinLength,
      stringMaxLength: option.stringMaxLength,
      arrayType: option.arrayType,
      nestedOptions: option.nestedOptions,
      enumValues: option.enumValues,
      parseJSON: option.parseJSON,
      arrayMaxLength: option.arrayMaxLength,
      arrayMinLength: option.arrayMinLength
    });
    if (!isType) {
      throw new ParseOptionsError(
        `${name}.${option.name} not ${option.type}` +
        `${option.type === "number" && option.numberMin !== undefined ? `${option.numberMin}:` : ""}${option.type === "number" && option.numberMax !== undefined ? `:${option.numberMax}` : ""}` +
        `${option.type === "string" && option.stringMinLength !== undefined ? `${option.stringMinLength}:` : ""}${option.type === "string" && option.stringMaxLength !== undefined ? `:${option.stringMaxLength}` : ""}` +
        `${option.type === "array" && option.arrayMinLength !== undefined ? `${option.arrayMinLength}:` : ""}${option.type === "array" && option.arrayMaxLength !== undefined ? `:${option.arrayMaxLength}` : ""}` +
        `${option.type === "array" && option.arrayType ? (option.arrayType !== "enum" ? ` of ${option.arrayType}` : ` of ${option.arrayType} as defined. valid values [${option.enumValues}]`) : (option.type === "nested" ? " as defined!" : (option.type === "enum" ? ` as defined. valid values [${option.enumValues}]` : ""))}`,
        `${name}.${option.name}`
      );
    }
    ret[option.name] = parsedValue;
  }
  switch (mode) {
    case "no_extra":
      const argKeys = Object.keys(arg);
      const hasExtra = Object.keys(ret).length !== argKeys.length;
      if (hasExtra) {
        for (const argKey of argKeys) {
          if (ignoreUndefined && arg[argKey] === undefined) {
            continue;
          } else if (!ret.hasOwnProperty(argKey)) {
            throw new ParseOptionsError(`${name}.${argKey} option not valid [${argKey}]`, `${name}.${argKey}`);
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

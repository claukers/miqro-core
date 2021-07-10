export interface SimpleMap<T> {
  [key: string]: T;
}

export type ParseOptionsMode = "remove_extra" | "add_extra" | "no_extra";
export type SimpleTypes = string | boolean | number | Array<SimpleTypes> | SimpleMap<SimpleTypes>;
export type ParseOptionTypeWithOutOptions = "string" | "boolean" | "number" | "object" | "any" | "array" | string;
export type ParseOptionType = "regex" | "nested" | "enum" | "multiple" | ParseOptionTypeWithOutOptions;

export type ParseOptionMap = SimpleMap<NoNameParseOption | ParseOptionTypeWithOutOptions>;

export interface NestedParseOption {
  ignoreUndefined?: boolean;
  options: ParseOption[] | ParseOptionMap;
  mode?: ParseOptionsMode;
}

export interface BasicParseOption extends ParseOptionValueType {
  required?: boolean;
  description?: string;
}

export interface NoNameParseOption extends BasicParseOption {
  description?: string;
  defaultValue?: any;
}

export interface ParseOption extends NoNameParseOption {
  name: string;
}

export interface ParseOptionValueType {
  type: ParseOptionType;
  options?: any;
  regex?: string;
  multipleOptions?: BasicParseOption[];
  forceArray?: boolean;
  allowNull?: boolean;
  arrayType?: ParseOptionType;
  arrayMinLength?: number;
  arrayMaxLength?: number;
  numberMax?: number;
  numberMaxDecimals?: number;
  numberMinDecimals?: number;
  numberMin?: number;
  stringMaxLength?: number;
  stringMinLength?: number;
  nestedOptions?: NestedParseOption;
  enumValues?: string[];
  parseJSON?: boolean;
}

export interface ParserCB {
  parseValue: (args: ParseValueArgs) => ParseValueValidatorResponse;
  parse: (
    name: string,
    arg: any,
    options: ParseOption[] | ParseOptionMap,
    mode?: ParseOptionsMode,
    ignoreUndefined?: boolean
  ) => ParseValueValidatorResponse;
}

export interface ParseValueArgs extends ParseOptionValueType {
  name: string;
  attrName: string;
  value: any;
}

export interface ParseValueValidatorResponse { isType: boolean; parsedValue: any; message?: string; }

export type ParseValueValidator = (args: ParseValueArgs, parser: ParserCB) => ParseValueValidatorResponse;

export const parseOptionMap2ParseOptionList = (map: ParseOptionMap): ParseOption[] => {
  return Object.keys(map).map(name => {
    const val = map[name];
    return typeof val !== "object" ? {
      name,
      required: true,
      type: val
    } : val.required === undefined ? {
      ...val,
      required: true,
      name
    } : {
      ...val,
      name
    };
  });
}

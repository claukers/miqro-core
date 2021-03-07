import { ParseOptionsError } from "../error";
import { parseAny } from "./any";
import { parseArray } from "./array";
import { parseBoolean } from "./boolean";
import { parseOptionMap2ParseOptionList, Map, ParseOption, ParseOptionMap, ParseOptionsMode, ParseValueArgs, ParseValueValidator, ParseValueValidatorResponse, ParserCB } from "./common";
import { parseEnum } from "./enum";
import { parseMultiple } from "./multiple";
import { parseNested } from "./nested";
import { parseNumber } from "./number";
import { parseObject } from "./object";
import { parseRegex } from "./regex";
import { parseString } from "./string";

export * from "./any";
export * from "./common";
export * from "./array";
export * from "./boolean";
export * from "./enum";
export * from "./nested";
export * from "./number";
export * from "./object";
export * from "./regex";
export * from "./string";

export class Parser {
  protected parsers: Map<ParseValueValidator>;
  constructor() {
    this.parsers = {};
    this.registerParser("any", parseAny);
    this.registerParser("array", parseArray);
    this.registerParser("boolean", parseBoolean);
    this.registerParser("enum", parseEnum);
    this.registerParser("multiple", parseMultiple);
    this.registerParser("nested", parseNested);
    this.registerParser("number", parseNumber);
    this.registerParser("object", parseObject);
    this.registerParser("string", parseString);
    this.registerParser("regex", parseRegex);
  }
  public registerParser(t: string, parser: ParseValueValidator): void {
    this.parsers[t] = parser;
  }
  public unRegisterParser(t: string): void {
    delete this.parsers[t];
  }
  public parseValue(args: ParseValueArgs): ParseValueValidatorResponse {
    const {
      type,
      forceArray,
      parseJSON,
      allowNull
    } = args;
    // check parsers
    const parser: ParseValueValidator = this.parsers[type];
    if (parser === undefined) {
      throw new ParseOptionsError(`unsupported type ${type}`);
    }
    // prepare args
    if (parseJSON) {
      if (typeof args.value !== "string") {
        throw new ParseOptionsError(`parseJSON not available to non string value`);
      }
      try {
        args.value = JSON.parse(args.value);
      } catch (e) {
        throw new ParseOptionsError(`value not json!`);
      }
    }

    if (allowNull && args.value === null) {
      return {
        isType: true,
        parsedValue: null
      };
    } else {
      if (forceArray && type === "array" && !(args.value instanceof Array)) {
        args.value = [args.value];
      } else if (forceArray && type !== "array") {
        throw new ParseOptionsError(`unsupported type ${type} with forceArray`);
      }
    }
    // run parser
    return parser(args, this.__newParserCB());
  }
  private __newParserCB(): ParserCB {
    const parseCB = (
      name: string,
      arg: any,
      options: ParseOption[] | ParseOptionMap,
      mode?: ParseOptionsMode,
      ignoreUndefined?: boolean
    ) => this.parse(name, arg, options, mode, ignoreUndefined);
    const parseValueCB = (args: ParseValueArgs): ParseValueValidatorResponse => this.parseValue(args);
    return {
      parse: parseCB,
      parseValue: parseValueCB
    };
  }
  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public parse(
    name: string,
    arg: any,
    options: ParseOption[] | ParseOptionMap,
    mode: ParseOptionsMode = "no_extra",
    ignoreUndefined = false): any {
    const ret: Map<any> = {};
    if (!arg || typeof arg !== "object") {
      throw new ParseOptionsError(`invalid ${name}`, name);
    }
    if (!(options instanceof Array)) {
      options = parseOptionMap2ParseOptionList(options);
    }

    for (const option of options) {
      const value = arg[option.name];
      if (value === undefined && option.defaultValue !== undefined) {
        ret[option.name] = option.defaultValue;
        continue;
      }
      const exists = ignoreUndefined ? value !== undefined : arg.hasOwnProperty(option.name);
      if (!exists && !option.required) {
        continue;
      } else if (!exists && option.required) {
        throw new ParseOptionsError(`${name}.${option.name} not defined`, `${name}.${option.name}`);
      }
      const { isType, parsedValue } = this.parseValue({
        name,
        attrName: option.name,
        type: option.type,
        regex: option.regex,
        value,
        numberMin: option.numberMin,
        numberMax: option.numberMax,
        allowNull: option.allowNull,
        options: option.options,
        multipleOptions: option.multipleOptions,
        stringMinLength: option.stringMinLength,
        stringMaxLength: option.stringMaxLength,
        arrayType: option.arrayType,
        nestedOptions: option.nestedOptions,
        enumValues: option.enumValues,
        parseJSON: option.parseJSON,
        arrayMaxLength: option.arrayMaxLength,
        arrayMinLength: option.arrayMinLength,
        forceArray: option.forceArray
      });
      if (!isType) {
        throw new ParseOptionsError(
          `${name}.${option.name} not ${option.type}` +
          `${option.type === "number" && option.numberMin !== undefined ? `${option.numberMin}:` : ""}${option.type === "number" && option.numberMax !== undefined ? `:${option.numberMax}` : ""}` +
          `${option.type === "string" && option.stringMinLength !== undefined ? `${option.stringMinLength}:` : ""}${option.type === "string" && option.stringMaxLength !== undefined ? `:${option.stringMaxLength}` : ""}` +
          `${option.type === "array" && option.arrayMinLength !== undefined ? `${option.arrayMinLength}:` : ""}${option.type === "array" && option.arrayMaxLength !== undefined ? `:${option.arrayMaxLength}` : ""}` +
          `${option.type === "array" && option.arrayType ? (option.arrayType !== "enum" ? ` of ${option.arrayType}` : ` of ${option.arrayType} as defined. valid values [${option.enumValues}]`) : ""}` +
          `${option.type === "nested" ? " as defined!" : ""}` +
          `${option.type === "enum" ? ` as defined. valid values [${option.enumValues}]` : ""}` +
          `${option.type === "multiple" ? ` as defined.` : ""}`,
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
  }
}

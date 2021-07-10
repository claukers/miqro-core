import { ConfigPathResolver } from "./config";
import { Parser, ParseOptionsMode, SimpleMap, ParseOption, ParseOptionMap, ParseValueValidator } from "./parse";
import { ParseValueArgs } from "./parse/common";

export interface ParseOptions {
  description?: string;
  options: ParseOption[] | ParseOptionMap;
  mode?: ParseOptionsMode;
  ignoreUndefined?: boolean;
}

const NO_OPTIONS: ParseOptions[] = [{
  options: [],
  mode: "no_extra"
}];

const ADD_EXTRA: ParseOptions[] = [{
  options: [],
  mode: "add_extra"
}];

export const normalizeParseOptions = (option?: ParseOptions | false | ParseOptions[]): ParseOptions[] =>
  option ? (option instanceof Array ? option : [option]) : (option === false ? NO_OPTIONS : ADD_EXTRA);

export * from "./parse";

const defaultParser = new Parser();

export const registerParser = (t: string, parser: ParseValueValidator): void => {
  return defaultParser.registerParser(t, parser);
}

export const unRegisterParser = (t: string): void => {
  return defaultParser.unRegisterParser(t);
}

export const parseValue = (
  args: ParseValueArgs
): SimpleMap<any> => {
  return defaultParser.parseValue(args);
}

/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
export const parse = (
  name: string,
  arg: any,
  options: ParseOption[] | ParseOptionMap,
  mode: ParseOptionsMode = "no_extra",
  ignoreUndefined = false
): SimpleMap<any> => {
  return defaultParser.parse(name, arg, options, mode, ignoreUndefined);
}

export const parseOptions = parse;

export const checkEnvVariables = (requiredEnvVariables: string[], defaults?: string[]): string[] => {
  if (defaults && defaults.length !== requiredEnvVariables.length) {
    throw new Error(`defaults cannot be a different length of requiredEnvVariables`);
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

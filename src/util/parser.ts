import { ConfigPathResolver } from "./config";
import { Parser, ParseOptionsMode, Map, ParseOption, ParseOptionMap, ParseValueValidator } from "./parse";
import { ParseValueArgs } from "./parse/common";

export * from "./parse";

/* eslint-disable  @typescript-eslint/no-empty-interface */
export interface SimpleMap<T> extends Map<T> { }

const defaultParser = new Parser();

export const registerParser = (t: string, parser: ParseValueValidator): void => {
  return defaultParser.registerParser(t, parser);
}

export const unRegisterParser = (t: string): void => {
  return defaultParser.unRegisterParser(t);
}

export const parseValue = (
  args: ParseValueArgs
): Map<any> => {
  return defaultParser.parseValue(args);
}

/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
export const parse = (
  name: string,
  arg: any,
  options: ParseOption[] | ParseOptionMap,
  mode: ParseOptionsMode = "no_extra",
  ignoreUndefined = false
): Map<any> => {
  return defaultParser.parse(name, arg, options, mode, ignoreUndefined);
}

export const parseOptions = parse;

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

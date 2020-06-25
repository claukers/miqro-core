"use strict";
import {existsSync} from "fs";
import {resolve} from "path";
import {ConfigPathResolver} from "./config";
import {ConsoleLogger, Logger, LogLevel} from "./logger";

// noinspection SpellCheckingInspection

export type LoggerFactory = (identifier: string) => Logger;

export const defaultLoggerFactory: LoggerFactory = (identifier: string): Logger => {
  const level = (process.env[`LOG_LEVEL_${identifier}`] || process.env.LOG_LEVEL || "info") as LogLevel;
  return new ConsoleLogger(identifier, level);
};

export const getLoggerFactory = (): LoggerFactory => {
  const logPath = resolve(ConfigPathResolver.getConfigDirname(), `log.js`);
  if (existsSync(logPath)) {
    return require(logPath);
  } else {
    return defaultLoggerFactory;
  }
};

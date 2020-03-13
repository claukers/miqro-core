"use strict";
import {existsSync} from "fs";
import {resolve} from "path";
import {format, transports} from "winston";
import {ConfigPathResolver} from "./config";

// noinspection SpellCheckingInspection
const {
  combine,
  label,
  printf,
  timestamp
} = format;

export const defaultLogFormat = printf((info) => {
  const pid = process.pid;
  const component = info.label;
  const level = info.level;
  const text = info.message;
  return `${new Date(info.timestamp).getTime()} ${pid} ` +
    `[${component}] ` +
    `${level !== "info" ? (level === "error" || level === "warn" ? `[${level.toUpperCase()}] ` : `[${level}] `) : ""}` +
    `${text}`;
});

export const defaultLoggerFactory = (identifier) => {
  const level = process.env[`LOG_LEVEL_${identifier}`] || process.env.LOG_LEVEL;
  const logFormat = defaultLogFormat;
  const transportList: any[] = [
    new transports.Console({
      level
    })
  ];

  if (process.env.LOG_FILE) {
    transportList.push(new transports.File({
      level,
      filename: resolve(process.env.LOG_FILE)
    }));
  }

  if (process.env.LOG_FILE_TRACE) {
    transportList.push(new transports.File({
      level: "silly",
      filename: resolve(process.env.LOG_FILE_TRACE)
    }));
  }
  return {
    format: combine(
      label({
        label: identifier
      }),
      timestamp(),
      logFormat
    ),
    transports: transportList
  };
};

export const winstonConfig = () => {
  const logPath = resolve(ConfigPathResolver.getConfigDirname(), `log.js`);
  if (existsSync(logPath)) {
    return require(logPath);
  } else {
    return defaultLoggerFactory;
  }
};

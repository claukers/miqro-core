import {format} from "util";
import {EventEmitter} from "events";
import {createWriteStream, WriteStream} from "fs";
import {resolve} from "path";
import {ConfigPathResolver} from "./config";

export type LogContainer = Map<string, Logger>;

export const LogContainer: LogContainer = new Map<string, Logger>();

export type LogLevel = "error" | "warn" | "info" | "debug" | "trace";

const LOG_LEVEL_MAP =
  {
    "error": 1,
    "warn": 2,
    "info": 3,
    "debug": 4,
    "trace": 5,
  };

export interface Logger {
  log(message?: any, ...optionalParams: any[]): void;

  info(message?: any, ...optionalParams: any[]): void;

  trace(message?: any, ...optionalParams: any[]): void;

  debug(message?: any, ...optionalParams: any[]): void;

  warn(message?: any, ...optionalParams: any[]): void;

  error(message?: any, ...optionalParams: any[]): void;
}

export type LoggerFormatter = (args: { identifier: string, level: LogLevel, message: string }) => string;

export const defaultLoggerFormatter: LoggerFormatter =
  ({identifier, level, message}) => `${new Date().toISOString()} ${process.pid} ` +
    `[${identifier}] ` +
    `${level !== "info" ? (level === "error" || level === "warn" ? `[${level.toUpperCase()}] ` : `[${level}] `) : ""}` +
    `${message}`;

export const LoggerEvents = {
  write: "write",
  error: "error"
};

export interface WriteArgs {
  level: LogLevel;
  message?: any;
  optionalParams: any[]
}

export interface LoggerWriteEventArgs extends WriteArgs {
  out: string;
}

export class Logger extends EventEmitter implements Logger {
  protected readonly _formatter: LoggerFormatter;

  constructor(protected readonly identifier: string, protected readonly level: LogLevel, formatter?: LoggerFormatter) {
    super();
    if (!LOG_LEVEL_MAP[level]) {
      throw new Error(`Unknown level [${level}]`);
    }
    this._formatter = formatter ? formatter : defaultLoggerFormatter;
  }

  protected write(args: WriteArgs): void {
    try {
      const eventArgs: LoggerWriteEventArgs = {
        out: this._formatter({
          identifier: this.identifier,
          level: args.level,
          message: format(args.message, ...args.optionalParams)
        }),
        ...args
      };
      this.emit(LoggerEvents.write, eventArgs);
    } catch (e) {
      this.emit(LoggerEvents.error, e);
    }
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public debug(message?: any, ...optionalParams: any[]): void {
    const level: LogLevel = "debug";
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP[level] ? this.write({level, message, optionalParams}) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public error(message?: any, ...optionalParams: any[]): void {
    const level: LogLevel = "error";
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP[level] ? this.write({level, message, optionalParams}) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public info(message?: any, ...optionalParams: any[]): void {
    const level: LogLevel = "info";
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP[level] ? this.write({level, message, optionalParams}) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public log(message?: any, ...optionalParams: any[]): void {
    const level: LogLevel = "info";
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP[level] ? this.write({level, message, optionalParams}) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public trace(message?: any, ...optionalParams: any[]): void {
    const level: LogLevel = "trace";
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP[level] ? this.write({level, message, optionalParams}) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public warn(message?: any, ...optionalParams: any[]): void {
    const level: LogLevel = "warn";
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP[level] ? this.write({level, message, optionalParams}) : undefined;
  }
}

export class ConsoleLogger extends Logger {
  constructor(identifier: string, level: LogLevel, formatter?: LoggerFormatter) {
    super(identifier, level, formatter);
    this.on(LoggerEvents.write, ({out, level}: LoggerWriteEventArgs) => {
      try {
        console[level](out);
      } catch (e) {
        this.emit(LoggerEvents.error, e);
      }
    });
  }
}

export class DefaultLogger extends ConsoleLogger {
  private fileHandler: WriteStream | undefined;

  constructor(identifier: string, level: LogLevel, formatter?: LoggerFormatter) {
    super(identifier, level, formatter);
    this.on(LoggerEvents.write, ({out}: LoggerWriteEventArgs) => {
      try {
        if (process.env.LOG_FILE && !this.fileHandler) {
          const path = resolve(process.env.LOG_FILE);
          this.fileHandler = createWriteStream(path, {flags: "a"})
        }
        if (this.fileHandler) {
          this.fileHandler.write(`${out}\n`, (err) => {
            if (err) {
              this.emit(LoggerEvents.error, err);
            }
          });
        }
      } catch (e) {
        this.emit(LoggerEvents.error, e);
      }
    });
  }
}

export const getLogger = (identifier?: string, formatter?: LoggerFormatter): Logger => {
  if (typeof identifier !== "string" && typeof identifier !== undefined) {
    throw new Error("Bad log identifier");
  } else if (identifier === undefined) {
    identifier = ConfigPathResolver.getServiceName();
  }
  if (LogContainer.has(identifier)) {
    return LogContainer.get(identifier) as Logger;
  } else {
    const factory = getLoggerFactory();
    const level = (process.env[`LOG_LEVEL_${identifier}`] || process.env.LOG_LEVEL || "info") as LogLevel;
    const logger = factory({identifier, level, formatter});
    LogContainer.set(identifier, logger);
    return logger;
  }
};

export type LoggerFactory = (args: { identifier: string, formatter?: LoggerFormatter, level: LogLevel; }) => Logger;

export const defaultLoggerFactory: LoggerFactory = ({identifier, formatter, level}): Logger => {
  return new DefaultLogger(identifier, level, formatter);
};

let customLoggerFactory: LoggerFactory;

export const setLoggerFactory = (factory: LoggerFactory): LoggerFactory => {
  customLoggerFactory = factory;
  return customLoggerFactory;
};

export const getLoggerFactory = (): LoggerFactory => {
  if (customLoggerFactory) {
    return customLoggerFactory;
  } else {
    return defaultLoggerFactory;
  }
};

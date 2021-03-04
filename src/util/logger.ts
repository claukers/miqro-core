import { format } from "util";
import { EventEmitter } from "events";
import { createWriteStream } from "fs";
import { resolve } from "path";
import { ConfigPathResolver } from "./config";

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
  ({ identifier, level, message }) => `${new Date().toISOString()} ${process.pid} ` +
    `[${identifier}] ` +
    `${level !== "info" ? (level === "error" || level === "warn" ? `[${level.toUpperCase()}] ` : `[${level}] `) : ""}` +
    `${message}`;

export const LoggerEvents = {
  error: "error"
};

export interface WriteArgs {
  level: LogLevel;
  message?: any;
  optionalParams: any[]
}

export interface LoggerTransportWriteArgs extends WriteArgs {
  out: string;
}

export interface LoggerTransport {
  write(args: LoggerTransportWriteArgs): Promise<void> | void;
}

export class Logger extends EventEmitter implements Logger {

  protected readonly options: { transports: LoggerTransport[]; formatter: LoggerFormatter; };

  constructor(protected readonly identifier: string, protected readonly level: LogLevel, options?: { transports?: LoggerTransport[]; formatter?: LoggerFormatter; }) {
    super();
    if (!LOG_LEVEL_MAP[level]) {
      throw new Error(`Unknown level [${level}]`);
    }
    this.options = {
      transports: options && options.transports !== undefined ? options.transports : defaultLoggerTransports(),
      formatter: options && options.formatter !== undefined ? options.formatter : defaultLoggerFormatter,
    };
  }

  protected write(args: WriteArgs): void {
    try {
      const eventArgs: LoggerTransportWriteArgs = {
        out: this.options.formatter({
          identifier: this.identifier,
          level: args.level,
          message: format(args.message, ...args.optionalParams)
        }),
        ...args
      };
      const tR = [];
      for (const transport of this.options.transports) {
        tR.push(transport.write(eventArgs));
      }
      Promise.all(tR).catch((e) => {
        this.emit(LoggerEvents.error, e);
      });
    } catch (e) {
      this.emit(LoggerEvents.error, e);
    }
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public debug(message?: any, ...optionalParams: any[]): void {
    const level: LogLevel = "debug";
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP[level] ? this.write({ level, message, optionalParams }) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public error(message?: any, ...optionalParams: any[]): void {
    const level: LogLevel = "error";
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP[level] ? this.write({ level, message, optionalParams }) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public info(message?: any, ...optionalParams: any[]): void {
    const level: LogLevel = "info";
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP[level] ? this.write({ level, message, optionalParams }) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public log(message?: any, ...optionalParams: any[]): void {
    const level: LogLevel = "info";
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP[level] ? this.write({ level, message, optionalParams }) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public trace(message?: any, ...optionalParams: any[]): void {
    const level: LogLevel = "trace";
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP[level] ? this.write({ level, message, optionalParams }) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public warn(message?: any, ...optionalParams: any[]): void {
    const level: LogLevel = "warn";
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP[level] ? this.write({ level, message, optionalParams }) : undefined;
  }
}

export const ConsoleTransport: (color?: boolean) => LoggerTransport = (color = true) => {
  return {
    write: async ({ level, out }: LoggerTransportWriteArgs): Promise<void> => {
      if (color) {
        switch (level) {
          case "warn":
            console.warn("\x1b[33m%s\x1b[0m", out);
            break;
          case "error":
            console.error("\x1b[31m%s\x1b[0m", out);
            break;
          case "trace":
            console.trace("\x1b[34m%s\x1b[0m", out);
            break;
          case "debug":
            console.debug("\x1b[36m%s\x1b[0m", out);
            break;
          default:
            console[level](out);
            break;
        }
      } else {
        console[level](out);
      }
    }
  };
};

export const FileTransport: (filePath?: string) => LoggerTransport = (filePath = process.env.LOG_FILE) => {
  const fileHandler = filePath ? createWriteStream(resolve(filePath), { flags: "a" }) : null;
  return {
    write: async ({ out }: LoggerTransportWriteArgs): Promise<void> => {
      if (fileHandler) {
        return new Promise((resolve, reject) => {
          fileHandler.write(`${out}\n`, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      }
    }
  };
};

export const getLogger = (identifier?: string, options?: { formatter?: LoggerFormatter, transports?: LoggerTransport[] }, useCache = true): Logger => {
  if (typeof identifier !== "string" && typeof identifier !== undefined) {
    throw new Error("Bad log identifier");
  } else if (identifier === undefined) {
    identifier = ConfigPathResolver.getServiceName();
  }
  if (useCache && LogContainer.has(identifier)) {
    return LogContainer.get(identifier) as Logger;
  } else {
    const factory = getLoggerFactory();
    const level = (process.env[`LOG_LEVEL_${identifier}`] || process.env.LOG_LEVEL || "info") as LogLevel;
    const logger = factory({ identifier, level, options });
    if (useCache) {
      LogContainer.set(identifier, logger);
    }
    return logger;
  }
};

export type LoggerFactory = (args: { identifier: string, level: LogLevel; options?: { transports?: LoggerTransport[]; formatter?: LoggerFormatter; } }) => Logger;

export const defaultLoggerTransports: () => LoggerTransport[] = () => [
  ConsoleTransport(),
  FileTransport()
];

export const defaultLoggerFactory: LoggerFactory = ({ identifier, options, level }): Logger => {
  return new Logger(identifier, level, options);
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

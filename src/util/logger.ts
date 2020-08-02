import {format} from "util";
import {EventEmitter} from "events";
import {createWriteStream, WriteStream} from "fs";
import {resolve} from "path";
import {getLoggerFactory} from "./loader";
import {ConfigPathResolver} from "./config";

const logContainer = new Map<string, Logger>();

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

export type Formatter = (level: LogLevel, message: string) => string;

export const defaultLoggerFormat = ({identifier}: { identifier: string; }): Formatter => {
  const pid = process.pid;
  return (level: string, message: string) => `${new Date().toISOString()} ${pid} ` +
    `[${identifier}] ` +
    `${level !== "info" ? (level === "error" || level === "warn" ? `[${level.toUpperCase()}] ` : `[${level}] `) : ""}` +
    `${message}`;
};

export const ConsoleLoggerEvents = {
  write: "write",
  error: "error"
};

export interface WriteArgs {
  level: LogLevel;
  message?: any;
  optionalParams: any[]
}

export interface WriteEventArgs extends WriteArgs {
  out: string;
}

export class ConsoleLogger extends EventEmitter implements Logger {
  protected readonly _formatter: Formatter;

  constructor(identifier: string, private readonly level: LogLevel, formatter?: Formatter) {
    super();
    if (!LOG_LEVEL_MAP[level]) {
      throw new Error(`Unknown level [${level}]`);
    }
    this._formatter = formatter ? formatter : defaultLoggerFormat({
      identifier
    });
    this.on(ConsoleLoggerEvents.write, ({out, level}: WriteEventArgs) => {
      console[level](out);
    })
  }

  protected write(args: WriteArgs): void {
    const eventArgs: WriteEventArgs = {
      out: this._formatter(args.level, format(args.message, ...args.optionalParams)),
      ...args
    };
    this.emit(ConsoleLoggerEvents.write, eventArgs);
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

export class DefaultLogger extends ConsoleLogger {
  private fileHandler: WriteStream | undefined;

  constructor(identifier: string, level: LogLevel, formatter?: Formatter) {
    super(identifier, level, formatter);
    this.on(ConsoleLoggerEvents.write, ({out}: WriteEventArgs) => {
      try {
        if (process.env.LOG_FILE && !this.fileHandler) {
          const path = resolve(process.env.LOG_FILE);
          this.fileHandler = createWriteStream(path, {flags: "a"})
        }
        if (this.fileHandler) {
          this.fileHandler.write(`${out}\n`, (err) => {
            if (err) {
              this.emit(ConsoleLoggerEvents.error, err);
            }
          });
        }
      } catch (e) {
        this.emit(ConsoleLoggerEvents.error, e);
      }
    });
  }
}

export const getLogger = (identifier: string | any): Logger => {
  if (typeof identifier !== "string") {
    throw new Error("Bad log identifier");
  }
  if (logContainer.has(identifier)) {
    return logContainer.get(identifier) as Logger;
  } else {
    const factory = getLoggerFactory();
    const logger = factory(identifier);
    logContainer.set(identifier, logger);
    return logger;
  }
};

export const getComponentLogger = (component ?: string): Logger => {
  const serviceName = ConfigPathResolver.getServiceName();
  return getLogger(`${serviceName ? `${serviceName}${component ? "." : ""}` : ""}${component ? component : ""}`);
}

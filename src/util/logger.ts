import {format} from "util";

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
  return (level: string, message: string) => `${new Date().getTime()} ${pid} ` +
    `[${identifier}] ` +
    `${level !== "info" ? (level === "error" || level === "warn" ? `[${level.toUpperCase()}] ` : `[${level}] `) : ""}` +
    `${message}`;
};

export class ConsoleLogger implements Logger {
  private readonly _formatter: Formatter = null;

  constructor(identifier: string, private readonly level: LogLevel) {
    if (!LOG_LEVEL_MAP[level]) {
      throw new Error(`Unknown level [${level}]`);
    }
    this._formatter = defaultLoggerFormat({
      identifier
    });
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public debug(message?: any, ...optionalParams: any[]): void {
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP["debug"] ? console.debug(this._formatter("debug", format(message, ...optionalParams))) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public error(message?: any, ...optionalParams: any[]): void {
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP["error"] ? console.debug(this._formatter("error", format(message, ...optionalParams))) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public info(message?: any, ...optionalParams: any[]): void {
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP["info"] ? console.debug(this._formatter("info", format(message, ...optionalParams))) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public log(message?: any, ...optionalParams: any[]): void {
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP["info"] ? console.debug(this._formatter("info", format(message, ...optionalParams))) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public trace(message?: any, ...optionalParams: any[]): void {
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP["trace"] ? console.debug(this._formatter("trace", format(message, ...optionalParams))) : undefined;
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public warn(message?: any, ...optionalParams: any[]): void {
    return LOG_LEVEL_MAP[this.level] >= LOG_LEVEL_MAP["warn"] ? console.debug(this._formatter("warn", format(message, ...optionalParams))) : undefined;
  }

}

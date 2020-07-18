[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/logger"](_util_logger_.md)

# Module: "util/logger"

## Index

### Classes

* [ConsoleLogger](../classes/_util_logger_.consolelogger.md)
* [DefaultLogger](../classes/_util_logger_.defaultlogger.md)

### Interfaces

* [Logger](../interfaces/_util_logger_.logger.md)
* [WriteArgs](../interfaces/_util_logger_.writeargs.md)
* [WriteEventArgs](../interfaces/_util_logger_.writeeventargs.md)

### Type aliases

* [Formatter](_util_logger_.md#formatter)
* [LogLevel](_util_logger_.md#loglevel)

### Functions

* [defaultLoggerFormat](_util_logger_.md#const-defaultloggerformat)

### Object literals

* [ConsoleLoggerEvents](_util_logger_.md#const-consoleloggerevents)
* [LOG_LEVEL_MAP](_util_logger_.md#const-log_level_map)

## Type aliases

###  Formatter

Ƭ **Formatter**: *function*

*Defined in [src/util/logger.ts:31](https://github.com/claukers/miqro-core/blob/543c996/src/util/logger.ts#L31)*

#### Type declaration:

▸ (`level`: [LogLevel](_util_logger_.md#loglevel), `message`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`level` | [LogLevel](_util_logger_.md#loglevel) |
`message` | string |

___

###  LogLevel

Ƭ **LogLevel**: *"error" | "warn" | "info" | "debug" | "trace"*

*Defined in [src/util/logger.ts:6](https://github.com/claukers/miqro-core/blob/543c996/src/util/logger.ts#L6)*

## Functions

### `Const` defaultLoggerFormat

▸ **defaultLoggerFormat**(`__namedParameters`: object): *[Formatter](_util_logger_.md#formatter)*

*Defined in [src/util/logger.ts:33](https://github.com/claukers/miqro-core/blob/543c996/src/util/logger.ts#L33)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`identifier` | string |

**Returns:** *[Formatter](_util_logger_.md#formatter)*

## Object literals

### `Const` ConsoleLoggerEvents

### ▪ **ConsoleLoggerEvents**: *object*

*Defined in [src/util/logger.ts:41](https://github.com/claukers/miqro-core/blob/543c996/src/util/logger.ts#L41)*

###  error

• **error**: *string* = "error"

*Defined in [src/util/logger.ts:43](https://github.com/claukers/miqro-core/blob/543c996/src/util/logger.ts#L43)*

###  write

• **write**: *string* = "write"

*Defined in [src/util/logger.ts:42](https://github.com/claukers/miqro-core/blob/543c996/src/util/logger.ts#L42)*

___

### `Const` LOG_LEVEL_MAP

### ▪ **LOG_LEVEL_MAP**: *object*

*Defined in [src/util/logger.ts:8](https://github.com/claukers/miqro-core/blob/543c996/src/util/logger.ts#L8)*

###  debug

• **debug**: *number* = 4

*Defined in [src/util/logger.ts:13](https://github.com/claukers/miqro-core/blob/543c996/src/util/logger.ts#L13)*

###  error

• **error**: *number* = 1

*Defined in [src/util/logger.ts:10](https://github.com/claukers/miqro-core/blob/543c996/src/util/logger.ts#L10)*

###  info

• **info**: *number* = 3

*Defined in [src/util/logger.ts:12](https://github.com/claukers/miqro-core/blob/543c996/src/util/logger.ts#L12)*

###  trace

• **trace**: *number* = 5

*Defined in [src/util/logger.ts:14](https://github.com/claukers/miqro-core/blob/543c996/src/util/logger.ts#L14)*

###  warn

• **warn**: *number* = 2

*Defined in [src/util/logger.ts:11](https://github.com/claukers/miqro-core/blob/543c996/src/util/logger.ts#L11)*

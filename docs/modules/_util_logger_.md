[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/logger"](_util_logger_.md)

# Module: "util/logger"

## Index

### Classes

* [ConsoleLogger](../classes/_util_logger_.consolelogger.md)

### Interfaces

* [Logger](../interfaces/_util_logger_.logger.md)

### Type aliases

* [Formatter](_util_logger_.md#formatter)
* [LogLevel](_util_logger_.md#loglevel)

### Functions

* [defaultLoggerFormat](_util_logger_.md#const-defaultloggerformat)

### Object literals

* [LOG_LEVEL_MAP](_util_logger_.md#const-log_level_map)

## Type aliases

###  Formatter

Ƭ **Formatter**: *function*

*Defined in [src/util/logger.ts:28](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L28)*

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

*Defined in [src/util/logger.ts:3](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L3)*

## Functions

### `Const` defaultLoggerFormat

▸ **defaultLoggerFormat**(`__namedParameters`: object): *[Formatter](_util_logger_.md#formatter)*

*Defined in [src/util/logger.ts:30](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L30)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`identifier` | string |

**Returns:** *[Formatter](_util_logger_.md#formatter)*

## Object literals

### `Const` LOG_LEVEL_MAP

### ▪ **LOG_LEVEL_MAP**: *object*

*Defined in [src/util/logger.ts:5](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L5)*

###  debug

• **debug**: *number* = 4

*Defined in [src/util/logger.ts:10](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L10)*

###  error

• **error**: *number* = 1

*Defined in [src/util/logger.ts:7](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L7)*

###  info

• **info**: *number* = 3

*Defined in [src/util/logger.ts:9](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L9)*

###  trace

• **trace**: *number* = 5

*Defined in [src/util/logger.ts:11](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L11)*

###  warn

• **warn**: *number* = 2

*Defined in [src/util/logger.ts:8](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L8)*

[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/logger"](../modules/_util_logger_.md) › [ConsoleLogger](_util_logger_.consolelogger.md)

# Class: ConsoleLogger

## Hierarchy

* **ConsoleLogger**

## Implements

* [Logger](../interfaces/_util_logger_.logger.md)

## Index

### Constructors

* [constructor](_util_logger_.consolelogger.md#constructor)

### Properties

* [_formatter](_util_logger_.consolelogger.md#private-_formatter)
* [level](_util_logger_.consolelogger.md#private-level)

### Methods

* [debug](_util_logger_.consolelogger.md#debug)
* [error](_util_logger_.consolelogger.md#error)
* [info](_util_logger_.consolelogger.md#info)
* [log](_util_logger_.consolelogger.md#log)
* [trace](_util_logger_.consolelogger.md#trace)
* [warn](_util_logger_.consolelogger.md#warn)

## Constructors

###  constructor

\+ **new ConsoleLogger**(`identifier`: string, `level`: [LogLevel](../modules/_util_logger_.md#loglevel)): *[ConsoleLogger](_util_logger_.consolelogger.md)*

*Defined in [src/util/logger.ts:39](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | string |
`level` | [LogLevel](../modules/_util_logger_.md#loglevel) |

**Returns:** *[ConsoleLogger](_util_logger_.consolelogger.md)*

## Properties

### `Private` _formatter

• **_formatter**: *[Formatter](../modules/_util_logger_.md#formatter)* = null

*Defined in [src/util/logger.ts:39](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L39)*

___

### `Private` level

• **level**: *[LogLevel](../modules/_util_logger_.md#loglevel)*

*Defined in [src/util/logger.ts:41](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L41)*

## Methods

###  debug

▸ **debug**(`message?`: any, ...`optionalParams`: any[]): *void*

*Implementation of [Logger](../interfaces/_util_logger_.logger.md)*

*Defined in [src/util/logger.ts:51](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`message?` | any |
`...optionalParams` | any[] |

**Returns:** *void*

___

###  error

▸ **error**(`message?`: any, ...`optionalParams`: any[]): *void*

*Implementation of [Logger](../interfaces/_util_logger_.logger.md)*

*Defined in [src/util/logger.ts:56](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`message?` | any |
`...optionalParams` | any[] |

**Returns:** *void*

___

###  info

▸ **info**(`message?`: any, ...`optionalParams`: any[]): *void*

*Implementation of [Logger](../interfaces/_util_logger_.logger.md)*

*Defined in [src/util/logger.ts:61](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`message?` | any |
`...optionalParams` | any[] |

**Returns:** *void*

___

###  log

▸ **log**(`message?`: any, ...`optionalParams`: any[]): *void*

*Implementation of [Logger](../interfaces/_util_logger_.logger.md)*

*Defined in [src/util/logger.ts:66](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`message?` | any |
`...optionalParams` | any[] |

**Returns:** *void*

___

###  trace

▸ **trace**(`message?`: any, ...`optionalParams`: any[]): *void*

*Implementation of [Logger](../interfaces/_util_logger_.logger.md)*

*Defined in [src/util/logger.ts:71](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`message?` | any |
`...optionalParams` | any[] |

**Returns:** *void*

___

###  warn

▸ **warn**(`message?`: any, ...`optionalParams`: any[]): *void*

*Implementation of [Logger](../interfaces/_util_logger_.logger.md)*

*Defined in [src/util/logger.ts:76](https://github.com/claukers/miqro-core/blob/65c3631/src/util/logger.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`message?` | any |
`...optionalParams` | any[] |

**Returns:** *void*

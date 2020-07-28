[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/logger"](../modules/_util_logger_.md) › [DefaultLogger](_util_logger_.defaultlogger.md)

# Class: DefaultLogger

## Hierarchy

  ↳ [ConsoleLogger](_util_logger_.consolelogger.md)

  ↳ **DefaultLogger**

## Implements

* [Logger](../interfaces/_util_logger_.logger.md)

## Index

### Constructors

* [constructor](_util_logger_.defaultlogger.md#constructor)

### Properties

* [_formatter](_util_logger_.defaultlogger.md#protected-_formatter)

### Methods

* [addListener](_util_logger_.defaultlogger.md#addlistener)
* [debug](_util_logger_.defaultlogger.md#debug)
* [emit](_util_logger_.defaultlogger.md#emit)
* [error](_util_logger_.defaultlogger.md#error)
* [eventNames](_util_logger_.defaultlogger.md#eventnames)
* [getMaxListeners](_util_logger_.defaultlogger.md#getmaxlisteners)
* [info](_util_logger_.defaultlogger.md#info)
* [listenerCount](_util_logger_.defaultlogger.md#listenercount)
* [listeners](_util_logger_.defaultlogger.md#listeners)
* [log](_util_logger_.defaultlogger.md#log)
* [off](_util_logger_.defaultlogger.md#off)
* [on](_util_logger_.defaultlogger.md#on)
* [once](_util_logger_.defaultlogger.md#once)
* [prependListener](_util_logger_.defaultlogger.md#prependlistener)
* [prependOnceListener](_util_logger_.defaultlogger.md#prependoncelistener)
* [rawListeners](_util_logger_.defaultlogger.md#rawlisteners)
* [removeAllListeners](_util_logger_.defaultlogger.md#removealllisteners)
* [removeListener](_util_logger_.defaultlogger.md#removelistener)
* [setMaxListeners](_util_logger_.defaultlogger.md#setmaxlisteners)
* [trace](_util_logger_.defaultlogger.md#trace)
* [warn](_util_logger_.defaultlogger.md#warn)
* [write](_util_logger_.defaultlogger.md#protected-write)

## Constructors

###  constructor

\+ **new DefaultLogger**(`identifier`: string, `level`: [LogLevel](../modules/_util_logger_.md#loglevel), `formatter?`: [Formatter](../modules/_util_logger_.md#formatter)): *[DefaultLogger](_util_logger_.defaultlogger.md)*

*Overrides [ConsoleLogger](_util_logger_.consolelogger.md).[constructor](_util_logger_.consolelogger.md#constructor)*

*Defined in [src/util/logger.ts:117](https://github.com/claukers/miqro-core/blob/c210610/src/util/logger.ts#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | string |
`level` | [LogLevel](../modules/_util_logger_.md#loglevel) |
`formatter?` | [Formatter](../modules/_util_logger_.md#formatter) |

**Returns:** *[DefaultLogger](_util_logger_.defaultlogger.md)*

## Properties

### `Protected` _formatter

• **_formatter**: *[Formatter](../modules/_util_logger_.md#formatter)* = null

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[_formatter](_util_logger_.consolelogger.md#protected-_formatter)*

*Defined in [src/util/logger.ts:57](https://github.com/claukers/miqro-core/blob/c210610/src/util/logger.ts#L57)*

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[addListener](_util_logger_.consolelogger.md#addlistener)*

Defined in node_modules/@types/node/events.d.ts:62

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  debug

▸ **debug**(`message?`: any, ...`optionalParams`: any[]): *void*

*Implementation of [Logger](../interfaces/_util_logger_.logger.md)*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[debug](_util_logger_.consolelogger.md#debug)*

*Defined in [src/util/logger.ts:81](https://github.com/claukers/miqro-core/blob/c210610/src/util/logger.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`message?` | any |
`...optionalParams` | any[] |

**Returns:** *void*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[emit](_util_logger_.consolelogger.md#emit)*

Defined in node_modules/@types/node/events.d.ts:72

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  error

▸ **error**(`message?`: any, ...`optionalParams`: any[]): *void*

*Implementation of [Logger](../interfaces/_util_logger_.logger.md)*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[error](_util_logger_.consolelogger.md#error)*

*Defined in [src/util/logger.ts:87](https://github.com/claukers/miqro-core/blob/c210610/src/util/logger.ts#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`message?` | any |
`...optionalParams` | any[] |

**Returns:** *void*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[eventNames](_util_logger_.consolelogger.md#eventnames)*

Defined in node_modules/@types/node/events.d.ts:77

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[getMaxListeners](_util_logger_.consolelogger.md#getmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:69

**Returns:** *number*

___

###  info

▸ **info**(`message?`: any, ...`optionalParams`: any[]): *void*

*Implementation of [Logger](../interfaces/_util_logger_.logger.md)*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[info](_util_logger_.consolelogger.md#info)*

*Defined in [src/util/logger.ts:93](https://github.com/claukers/miqro-core/blob/c210610/src/util/logger.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`message?` | any |
`...optionalParams` | any[] |

**Returns:** *void*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[listenerCount](_util_logger_.consolelogger.md#listenercount)*

Defined in node_modules/@types/node/events.d.ts:73

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[listeners](_util_logger_.consolelogger.md#listeners)*

Defined in node_modules/@types/node/events.d.ts:70

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  log

▸ **log**(`message?`: any, ...`optionalParams`: any[]): *void*

*Implementation of [Logger](../interfaces/_util_logger_.logger.md)*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[log](_util_logger_.consolelogger.md#log)*

*Defined in [src/util/logger.ts:99](https://github.com/claukers/miqro-core/blob/c210610/src/util/logger.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`message?` | any |
`...optionalParams` | any[] |

**Returns:** *void*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[off](_util_logger_.consolelogger.md#off)*

Defined in node_modules/@types/node/events.d.ts:66

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  on

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[on](_util_logger_.consolelogger.md#on)*

Defined in node_modules/@types/node/events.d.ts:63

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[once](_util_logger_.consolelogger.md#once)*

Defined in node_modules/@types/node/events.d.ts:64

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[prependListener](_util_logger_.consolelogger.md#prependlistener)*

Defined in node_modules/@types/node/events.d.ts:75

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[prependOnceListener](_util_logger_.consolelogger.md#prependoncelistener)*

Defined in node_modules/@types/node/events.d.ts:76

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[rawListeners](_util_logger_.consolelogger.md#rawlisteners)*

Defined in node_modules/@types/node/events.d.ts:71

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[removeAllListeners](_util_logger_.consolelogger.md#removealllisteners)*

Defined in node_modules/@types/node/events.d.ts:67

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[removeListener](_util_logger_.consolelogger.md#removelistener)*

Defined in node_modules/@types/node/events.d.ts:65

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[setMaxListeners](_util_logger_.consolelogger.md#setmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:68

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

###  trace

▸ **trace**(`message?`: any, ...`optionalParams`: any[]): *void*

*Implementation of [Logger](../interfaces/_util_logger_.logger.md)*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[trace](_util_logger_.consolelogger.md#trace)*

*Defined in [src/util/logger.ts:105](https://github.com/claukers/miqro-core/blob/c210610/src/util/logger.ts#L105)*

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

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[warn](_util_logger_.consolelogger.md#warn)*

*Defined in [src/util/logger.ts:111](https://github.com/claukers/miqro-core/blob/c210610/src/util/logger.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`message?` | any |
`...optionalParams` | any[] |

**Returns:** *void*

___

### `Protected` write

▸ **write**(`args`: [WriteArgs](../interfaces/_util_logger_.writeargs.md)): *void*

*Inherited from [ConsoleLogger](_util_logger_.consolelogger.md).[write](_util_logger_.consolelogger.md#protected-write)*

*Defined in [src/util/logger.ts:72](https://github.com/claukers/miqro-core/blob/c210610/src/util/logger.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | [WriteArgs](../interfaces/_util_logger_.writeargs.md) |

**Returns:** *void*

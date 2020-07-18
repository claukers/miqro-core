[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/util"](../modules/_util_util_.md) › [Util](_util_util_.util.md)

# Class: Util

## Hierarchy

* **Util**

## Index

### Properties

* [configLoaded](_util_util_.util.md#static-private-configloaded)

### Methods

* [checkEnvVariables](_util_util_.util.md#static-checkenvvariables)
* [checkModules](_util_util_.util.md#static-checkmodules)
* [getComponentLogger](_util_util_.util.md#static-getcomponentlogger)
* [getConfig](_util_util_.util.md#static-getconfig)
* [getLogger](_util_util_.util.md#static-getlogger)
* [loadConfig](_util_util_.util.md#static-loadconfig)
* [overrideConfig](_util_util_.util.md#static-overrideconfig)
* [parseOptions](_util_util_.util.md#static-parseoptions)
* [setupInstanceEnv](_util_util_.util.md#static-setupinstanceenv)
* [setupSimpleEnv](_util_util_.util.md#static-setupsimpleenv)

## Properties

### `Static` `Private` configLoaded

▪ **configLoaded**: *boolean* = false

*Defined in [src/util/util.ts:221](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L221)*

## Methods

### `Static` checkEnvVariables

▸ **checkEnvVariables**(`requiredEnvVariables`: string[]): *void*

*Defined in [src/util/util.ts:135](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L135)*

**Parameters:**

Name | Type |
------ | ------ |
`requiredEnvVariables` | string[] |

**Returns:** *void*

___

### `Static` checkModules

▸ **checkModules**(`requiredModules`: string[]): *void*

*Defined in [src/util/util.ts:125](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L125)*

**Parameters:**

Name | Type |
------ | ------ |
`requiredModules` | string[] |

**Returns:** *void*

___

### `Static` getComponentLogger

▸ **getComponentLogger**(`component?`: string): *[Logger](../interfaces/_util_logger_.logger.md)*

*Defined in [src/util/util.ts:216](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L216)*

**Parameters:**

Name | Type |
------ | ------ |
`component?` | string |

**Returns:** *[Logger](../interfaces/_util_logger_.logger.md)*

___

### `Static` getConfig

▸ **getConfig**(): *object*

*Defined in [src/util/util.ts:85](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L85)*

**Returns:** *object*

* **combined**: *[SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string›*

* **outputs**: *[ConfigOutput](../modules/_util_util_.md#configoutput)[]*

___

### `Static` getLogger

▸ **getLogger**(`identifier`: string): *[Logger](../interfaces/_util_logger_.logger.md)*

*Defined in [src/util/util.ts:205](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L205)*

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | string |

**Returns:** *[Logger](../interfaces/_util_logger_.logger.md)*

___

### `Static` loadConfig

▸ **loadConfig**(): *void*

*Defined in [src/util/util.ts:118](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L118)*

**Returns:** *void*

___

### `Static` overrideConfig

▸ **overrideConfig**(`path`: string, `combined?`: [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string›): *[ConfigOutput](../modules/_util_util_.md#configoutput)[]*

*Defined in [src/util/util.ts:60](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`combined?` | [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string› |

**Returns:** *[ConfigOutput](../modules/_util_util_.md#configoutput)[]*

___

### `Static` parseOptions

▸ **parseOptions**(`argName`: string, `arg`: object, `optionsArray`: object[], `parserOption`: [OPTIONPARSERType](../modules/_util_util_.md#optionparsertype)): *[SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹any›*

*Defined in [src/util/util.ts:143](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L143)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`argName` | string | - |
`arg` | object | - |
`optionsArray` | object[] | - |
`parserOption` | [OPTIONPARSERType](../modules/_util_util_.md#optionparsertype) | "no_extra" |

**Returns:** *[SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹any›*

___

### `Static` setupInstanceEnv

▸ **setupInstanceEnv**(`serviceName`: string, `scriptPath`: string): *void*

*Defined in [src/util/util.ts:47](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`serviceName` | string |
`scriptPath` | string |

**Returns:** *void*

___

### `Static` setupSimpleEnv

▸ **setupSimpleEnv**(): *void*

*Defined in [src/util/util.ts:43](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L43)*

**Returns:** *void*

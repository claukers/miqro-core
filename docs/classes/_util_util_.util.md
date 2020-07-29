[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/util"](../modules/_util_util_.md) › [Util](_util_util_.util.md)

# Class: Util

## Hierarchy

* **Util**

## Index

### Properties

* [configLoaded](_util_util_.util.md#static-private-configloaded)
* [logger](_util_util_.util.md#static-logger)

### Methods

* [checkEnvVariables](_util_util_.util.md#static-checkenvvariables)
* [checkModules](_util_util_.util.md#static-checkmodules)
* [getComponentLogger](_util_util_.util.md#static-getcomponentlogger)
* [getConfig](_util_util_.util.md#static-getconfig)
* [getLogger](_util_util_.util.md#static-getlogger)
* [loadConfig](_util_util_.util.md#static-loadconfig)
* [overrideConfig](_util_util_.util.md#static-overrideconfig)
* [parseOptions](_util_util_.util.md#static-parseoptions)
* [request](_util_util_.util.md#static-request)
* [setupInstanceEnv](_util_util_.util.md#static-setupinstanceenv)
* [setupSimpleEnv](_util_util_.util.md#static-setupsimpleenv)

## Properties

### `Static` `Private` configLoaded

▪ **configLoaded**: *boolean* = false

*Defined in [src/util/util.ts:376](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L376)*

___

### `Static` logger

▪ **logger**: *[Logger](../interfaces/_util_logger_.logger.md)*

*Defined in [src/util/util.ts:77](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L77)*

## Methods

### `Static` checkEnvVariables

▸ **checkEnvVariables**(`requiredEnvVariables`: string[]): *void*

*Defined in [src/util/util.ts:276](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L276)*

**Parameters:**

Name | Type |
------ | ------ |
`requiredEnvVariables` | string[] |

**Returns:** *void*

___

### `Static` checkModules

▸ **checkModules**(`requiredModules`: string[]): *void*

*Defined in [src/util/util.ts:266](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L266)*

**Parameters:**

Name | Type |
------ | ------ |
`requiredModules` | string[] |

**Returns:** *void*

___

### `Static` getComponentLogger

▸ **getComponentLogger**(`component?`: undefined | string): *[Logger](../interfaces/_util_logger_.logger.md)*

*Defined in [src/util/util.ts:371](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L371)*

**Parameters:**

Name | Type |
------ | ------ |
`component?` | undefined &#124; string |

**Returns:** *[Logger](../interfaces/_util_logger_.logger.md)*

___

### `Static` getConfig

▸ **getConfig**(): *object*

*Defined in [src/util/util.ts:224](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L224)*

**Returns:** *object*

* **combined**: *[SimpleMap](../interfaces/_util_util_.simplemap.md)‹string›*

* **outputs**: *[ConfigOutput](../modules/_util_util_.md#configoutput)[]*

___

### `Static` getLogger

▸ **getLogger**(`identifier`: string | any): *[Logger](../interfaces/_util_logger_.logger.md)*

*Defined in [src/util/util.ts:357](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L357)*

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | string &#124; any |

**Returns:** *[Logger](../interfaces/_util_logger_.logger.md)*

___

### `Static` loadConfig

▸ **loadConfig**(): *void*

*Defined in [src/util/util.ts:257](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L257)*

**Returns:** *void*

___

### `Static` overrideConfig

▸ **overrideConfig**(`path`: string, `combined?`: [SimpleMap](../interfaces/_util_util_.simplemap.md)‹string›): *[ConfigOutput](../modules/_util_util_.md#configoutput)[]*

*Defined in [src/util/util.ts:199](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L199)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`combined?` | [SimpleMap](../interfaces/_util_util_.simplemap.md)‹string› |

**Returns:** *[ConfigOutput](../modules/_util_util_.md#configoutput)[]*

___

### `Static` parseOptions

▸ **parseOptions**(`argName`: string, `arg`: [SimpleMap](../interfaces/_util_util_.simplemap.md)‹[SimpleTypes](../modules/_util_util_.md#simpletypes)›, `optionsArray`: object[], `parserOption`: [OPTIONPARSERType](../modules/_util_util_.md#optionparsertype)): *[SimpleMap](../interfaces/_util_util_.simplemap.md)‹[SimpleTypes](../modules/_util_util_.md#simpletypes)›*

*Defined in [src/util/util.ts:284](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L284)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`argName` | string | - |
`arg` | [SimpleMap](../interfaces/_util_util_.simplemap.md)‹[SimpleTypes](../modules/_util_util_.md#simpletypes)› | - |
`optionsArray` | object[] | - |
`parserOption` | [OPTIONPARSERType](../modules/_util_util_.md#optionparsertype) | "no_extra" |

**Returns:** *[SimpleMap](../interfaces/_util_util_.simplemap.md)‹[SimpleTypes](../modules/_util_util_.md#simpletypes)›*

___

### `Static` request

▸ **request**(`options`: [RequestOptions](../interfaces/_util_util_.requestoptions.md)): *Promise‹object›*

*Defined in [src/util/util.ts:83](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [RequestOptions](../interfaces/_util_util_.requestoptions.md) |

**Returns:** *Promise‹object›*

___

### `Static` setupInstanceEnv

▸ **setupInstanceEnv**(`serviceName`: string, `scriptPath`: string): *void*

*Defined in [src/util/util.ts:184](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L184)*

**Parameters:**

Name | Type |
------ | ------ |
`serviceName` | string |
`scriptPath` | string |

**Returns:** *void*

___

### `Static` setupSimpleEnv

▸ **setupSimpleEnv**(): *void*

*Defined in [src/util/util.ts:79](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L79)*

**Returns:** *void*

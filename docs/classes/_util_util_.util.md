[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/util"](../modules/_util_util_.md) › [Util](_util_util_.util.md)

# Class: Util

## Hierarchy

* **Util**

## Index

### Properties

* [configLoaded](_util_util_.util.md#static-private-configloaded)

### Methods

* [checkEnvVariables](_util_util_.util.md#static-checkenvvariables)
* [getLogger](_util_util_.util.md#static-getlogger)
* [loadConfig](_util_util_.util.md#static-loadconfig)
* [overrideConfig](_util_util_.util.md#static-overrideconfig)
* [parseOptions](_util_util_.util.md#static-parseoptions)
* [setupInstanceEnv](_util_util_.util.md#static-setupinstanceenv)
* [setupSimpleEnv](_util_util_.util.md#static-setupsimpleenv)
* [sha256](_util_util_.util.md#static-sha256)

## Properties

### `Static` `Private` configLoaded

▪ **configLoaded**: *boolean* = false

*Defined in [src/util/util.ts:189](https://github.com/claukers/miqro-core/blob/6562042/src/util/util.ts#L189)*

## Methods

### `Static` checkEnvVariables

▸ **checkEnvVariables**(`requiredEnvVariables`: string[]): *void*

*Defined in [src/util/util.ts:100](https://github.com/claukers/miqro-core/blob/6562042/src/util/util.ts#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`requiredEnvVariables` | string[] |

**Returns:** *void*

___

### `Static` getLogger

▸ **getLogger**(`identifier`: string): *Logger‹›*

*Defined in [src/util/util.ts:170](https://github.com/claukers/miqro-core/blob/6562042/src/util/util.ts#L170)*

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | string |

**Returns:** *Logger‹›*

___

### `Static` loadConfig

▸ **loadConfig**(): *void*

*Defined in [src/util/util.ts:77](https://github.com/claukers/miqro-core/blob/6562042/src/util/util.ts#L77)*

**Returns:** *void*

___

### `Static` overrideConfig

▸ **overrideConfig**(`path`: string): *void*

*Defined in [src/util/util.ts:60](https://github.com/claukers/miqro-core/blob/6562042/src/util/util.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *void*

___

### `Static` parseOptions

▸ **parseOptions**(`argName`: any, `arg`: object, `optionsArray`: Array‹object›, `parserOption`: [IOPTIONPARSER](../modules/_util_util_.md#ioptionparser)): *object*

*Defined in [src/util/util.ts:108](https://github.com/claukers/miqro-core/blob/6562042/src/util/util.ts#L108)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`argName` | any | - |
`arg` | object | - |
`optionsArray` | Array‹object› | - |
`parserOption` | [IOPTIONPARSER](../modules/_util_util_.md#ioptionparser) | "no_extra" |

**Returns:** *object*

* \[ **name**: *string*\]: any

___

### `Static` setupInstanceEnv

▸ **setupInstanceEnv**(`serviceName`: string, `scriptPath`: string): *void*

*Defined in [src/util/util.ts:47](https://github.com/claukers/miqro-core/blob/6562042/src/util/util.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`serviceName` | string |
`scriptPath` | string |

**Returns:** *void*

___

### `Static` setupSimpleEnv

▸ **setupSimpleEnv**(): *void*

*Defined in [src/util/util.ts:43](https://github.com/claukers/miqro-core/blob/6562042/src/util/util.ts#L43)*

**Returns:** *void*

___

### `Static` sha256

▸ **sha256**(`data`: any): *string*

*Defined in [src/util/util.ts:41](https://github.com/claukers/miqro-core/blob/6562042/src/util/util.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *string*

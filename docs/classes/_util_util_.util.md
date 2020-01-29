[miqro-core](../README.md) › [Globals](../globals.md) › ["util/util"](../modules/_util_util_.md) › [Util](_util_util_.util.md)

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
* [parseOptions](_util_util_.util.md#static-parseoptions)
* [setupInstanceEnv](_util_util_.util.md#static-setupinstanceenv)
* [setupSimpleEnv](_util_util_.util.md#static-setupsimpleenv)
* [sha256](_util_util_.util.md#static-sha256)

## Properties

### `Static` `Private` configLoaded

▪ **configLoaded**: *boolean* = false

*Defined in [src/util/util.ts:188](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L188)*

## Methods

### `Static` checkEnvVariables

▸ **checkEnvVariables**(`requiredEnvVariables`: string[]): *void*

*Defined in [src/util/util.ts:99](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`requiredEnvVariables` | string[] |

**Returns:** *void*

___

### `Static` getLogger

▸ **getLogger**(`identifier`: string): *Logger‹›*

*Defined in [src/util/util.ts:169](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L169)*

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | string |

**Returns:** *Logger‹›*

___

### `Static` loadConfig

▸ **loadConfig**(`initEnv?`: boolean): *void*

*Defined in [src/util/util.ts:61](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`initEnv?` | boolean |

**Returns:** *void*

___

### `Static` parseOptions

▸ **parseOptions**(`argName`: any, `arg`: object, `optionsArray`: Array‹object›, `parserOption`: [IOPTIONPARSER](../modules/_util_util_.md#ioptionparser)): *object*

*Defined in [src/util/util.ts:107](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L107)*

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

*Defined in [src/util/util.ts:49](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`serviceName` | string |
`scriptPath` | string |

**Returns:** *void*

___

### `Static` setupSimpleEnv

▸ **setupSimpleEnv**(): *void*

*Defined in [src/util/util.ts:45](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L45)*

**Returns:** *void*

___

### `Static` sha256

▸ **sha256**(`data`: any): *string*

*Defined in [src/util/util.ts:43](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *string*

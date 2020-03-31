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
* [request](_util_util_.util.md#static-request)
* [setupInstanceEnv](_util_util_.util.md#static-setupinstanceenv)
* [setupSimpleEnv](_util_util_.util.md#static-setupsimpleenv)
* [sha256](_util_util_.util.md#static-sha256)
* [uuid](_util_util_.util.md#static-uuid)

### Object literals

* [jwt](_util_util_.util.md#static-jwt)

## Properties

### `Static` `Private` configLoaded

▪ **configLoaded**: *boolean* = false

*Defined in [src/util/util.ts:206](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L206)*

## Methods

### `Static` checkEnvVariables

▸ **checkEnvVariables**(`requiredEnvVariables`: string[]): *void*

*Defined in [src/util/util.ts:117](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`requiredEnvVariables` | string[] |

**Returns:** *void*

___

### `Static` getLogger

▸ **getLogger**(`identifier`: string): *Logger‹›*

*Defined in [src/util/util.ts:187](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L187)*

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | string |

**Returns:** *Logger‹›*

___

### `Static` loadConfig

▸ **loadConfig**(): *void*

*Defined in [src/util/util.ts:94](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L94)*

**Returns:** *void*

___

### `Static` overrideConfig

▸ **overrideConfig**(`path`: string): *void*

*Defined in [src/util/util.ts:77](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *void*

___

### `Static` parseOptions

▸ **parseOptions**(`argName`: any, `arg`: object, `optionsArray`: object[], `parserOption`: [IOPTIONPARSER](../modules/_util_util_.md#ioptionparser)): *object*

*Defined in [src/util/util.ts:125](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L125)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`argName` | any | - |
`arg` | object | - |
`optionsArray` | object[] | - |
`parserOption` | [IOPTIONPARSER](../modules/_util_util_.md#ioptionparser) | "no_extra" |

**Returns:** *object*

* \[ **name**: *string*\]: any

___

### `Static` request

▸ **request**(`options`: AxiosRequestConfig): *AxiosPromise*

*Defined in [src/util/util.ts:52](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | AxiosRequestConfig |

**Returns:** *AxiosPromise*

___

### `Static` setupInstanceEnv

▸ **setupInstanceEnv**(`serviceName`: string, `scriptPath`: string): *void*

*Defined in [src/util/util.ts:64](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`serviceName` | string |
`scriptPath` | string |

**Returns:** *void*

___

### `Static` setupSimpleEnv

▸ **setupSimpleEnv**(): *void*

*Defined in [src/util/util.ts:60](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L60)*

**Returns:** *void*

___

### `Static` sha256

▸ **sha256**(`data`: any): *string*

*Defined in [src/util/util.ts:44](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *string*

___

### `Static` uuid

▸ **uuid**(): *any*

*Defined in [src/util/util.ts:48](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L48)*

**Returns:** *any*

## Object literals

### `Static` jwt

### ▪ **jwt**: *object*

*Defined in [src/util/util.ts:56](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L56)*

###  decode

• **decode**: *any*

*Defined in [src/util/util.ts:57](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L57)*

###  sign

• **sign**: *any*

*Defined in [src/util/util.ts:57](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L57)*

###  verify

• **verify**: *any*

*Defined in [src/util/util.ts:57](https://github.com/claukers/miqro-core/blob/c08f824/src/util/util.ts#L57)*

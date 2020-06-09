[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/util"](../modules/_util_util_.md) › [Util](_util_util_.util.md)

# Class: Util

## Hierarchy

* **Util**

## Index

### Properties

* [configLoaded](_util_util_.util.md#static-private-configloaded)

### Methods

* [checkEnvVariables](_util_util_.util.md#static-checkenvvariables)
* [getComponentLogger](_util_util_.util.md#static-getcomponentlogger)
* [getConfig](_util_util_.util.md#static-getconfig)
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

*Defined in [src/util/util.ts:236](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L236)*

## Methods

### `Static` checkEnvVariables

▸ **checkEnvVariables**(`requiredEnvVariables`: string[]): *void*

*Defined in [src/util/util.ts:142](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`requiredEnvVariables` | string[] |

**Returns:** *void*

___

### `Static` getComponentLogger

▸ **getComponentLogger**(`component?`: string): *Logger*

*Defined in [src/util/util.ts:231](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L231)*

**Parameters:**

Name | Type |
------ | ------ |
`component?` | string |

**Returns:** *Logger*

___

### `Static` getConfig

▸ **getConfig**(): *object*

*Defined in [src/util/util.ts:102](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L102)*

**Returns:** *object*

* **combined**: *[SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string›*

* **outputs**: *DotenvConfigOutput[]*

___

### `Static` getLogger

▸ **getLogger**(`identifier`: string): *Logger*

*Defined in [src/util/util.ts:212](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L212)*

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | string |

**Returns:** *Logger*

___

### `Static` loadConfig

▸ **loadConfig**(): *void*

*Defined in [src/util/util.ts:135](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L135)*

**Returns:** *void*

___

### `Static` overrideConfig

▸ **overrideConfig**(`path`: string, `combined?`: [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string›): *DotenvConfigOutput[]*

*Defined in [src/util/util.ts:79](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`combined?` | [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string› |

**Returns:** *DotenvConfigOutput[]*

___

### `Static` parseOptions

▸ **parseOptions**(`argName`: string, `arg`: object, `optionsArray`: object[], `parserOption`: [OPTIONPARSERType](../modules/_util_util_.md#optionparsertype)): *[SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹any›*

*Defined in [src/util/util.ts:150](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L150)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`argName` | string | - |
`arg` | object | - |
`optionsArray` | object[] | - |
`parserOption` | [OPTIONPARSERType](../modules/_util_util_.md#optionparsertype) | "no_extra" |

**Returns:** *[SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹any›*

___

### `Static` request

▸ **request**(`options`: AxiosRequestConfig): *AxiosPromise*

*Defined in [src/util/util.ts:54](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | AxiosRequestConfig |

**Returns:** *AxiosPromise*

___

### `Static` setupInstanceEnv

▸ **setupInstanceEnv**(`serviceName`: string, `scriptPath`: string): *void*

*Defined in [src/util/util.ts:66](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`serviceName` | string |
`scriptPath` | string |

**Returns:** *void*

___

### `Static` setupSimpleEnv

▸ **setupSimpleEnv**(): *void*

*Defined in [src/util/util.ts:62](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L62)*

**Returns:** *void*

___

### `Static` sha256

▸ **sha256**(`data`: string): *string*

*Defined in [src/util/util.ts:46](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | string |

**Returns:** *string*

___

### `Static` uuid

▸ **uuid**(): *string*

*Defined in [src/util/util.ts:50](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L50)*

**Returns:** *string*

## Object literals

### `Static` jwt

### ▪ **jwt**: *object*

*Defined in [src/util/util.ts:58](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L58)*

###  decode

• **decode**: *any*

*Defined in [src/util/util.ts:59](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L59)*

###  sign

• **sign**: *any*

*Defined in [src/util/util.ts:59](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L59)*

###  verify

• **verify**: *any*

*Defined in [src/util/util.ts:59](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L59)*

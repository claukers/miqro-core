[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/util"](_util_util_.md)

# Module: "util/util"

## Index

### Classes

* [ResponseError](../classes/_util_util_.responseerror.md)
* [Util](../classes/_util_util_.util.md)

### Interfaces

* [RequestOptions](../interfaces/_util_util_.requestoptions.md)
* [SimpleMap](../interfaces/_util_util_.simplemap.md)

### Type aliases

* [ConfigOutput](_util_util_.md#configoutput)
* [OPTIONPARSERType](_util_util_.md#optionparsertype)
* [ParseSimpleType](_util_util_.md#parsesimpletype)
* [SimpleTypes](_util_util_.md#simpletypes)

### Variables

* [logContainer](_util_util_.md#const-logcontainer)

### Functions

* [MISSED_CONFIG](_util_util_.md#const-missed_config)
* [MISSED_TO_RUNMIQRO_INIT](_util_util_.md#const-missed_to_runmiqro_init)
* [isOPTIONPARSERType](_util_util_.md#const-isoptionparsertype)
* [isParseSimpleOption](_util_util_.md#const-isparsesimpleoption)
* [parseSimpleOption](_util_util_.md#const-parsesimpleoption)

## Type aliases

###  ConfigOutput

Ƭ **ConfigOutput**: *[SimpleMap](../interfaces/_util_util_.simplemap.md)‹string›*

*Defined in [src/util/util.ts:63](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L63)*

___

###  OPTIONPARSERType

Ƭ **OPTIONPARSERType**: *"remove_extra" | "add_extra" | "no_extra"*

*Defined in [src/util/util.ts:29](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L29)*

___

###  ParseSimpleType

Ƭ **ParseSimpleType**: *"string" | "boolean" | "number" | "object" | "any"*

*Defined in [src/util/util.ts:31](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L31)*

___

###  SimpleTypes

Ƭ **SimpleTypes**: *string | boolean | number | Array‹[SimpleTypes](_util_util_.md#simpletypes)› | [SimpleMap](../interfaces/_util_util_.simplemap.md)‹[SimpleTypes](_util_util_.md#simpletypes)›*

*Defined in [src/util/util.ts:30](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L30)*

## Variables

### `Const` logContainer

• **logContainer**: *Map‹string, [Logger](../interfaces/_util_logger_.logger.md)›* = new Map<string, Logger>()

*Defined in [src/util/util.ts:41](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L41)*

## Functions

### `Const` MISSED_CONFIG

▸ **MISSED_CONFIG**(`path`: string): *string*

*Defined in [src/util/util.ts:25](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *string*

___

### `Const` MISSED_TO_RUNMIQRO_INIT

▸ **MISSED_TO_RUNMIQRO_INIT**(`configDirname`: string): *string*

*Defined in [src/util/util.ts:26](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`configDirname` | string |

**Returns:** *string*

___

### `Const` isOPTIONPARSERType

▸ **isOPTIONPARSERType**(`type`: string | any): *boolean*

*Defined in [src/util/util.ts:33](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; any |

**Returns:** *boolean*

___

### `Const` isParseSimpleOption

▸ **isParseSimpleOption**(`type`: string | any): *boolean*

*Defined in [src/util/util.ts:37](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; any |

**Returns:** *boolean*

___

### `Const` parseSimpleOption

▸ **parseSimpleOption**(`type`: [ParseSimpleType](_util_util_.md#parsesimpletype), `value`: any): *boolean*

*Defined in [src/util/util.ts:43](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [ParseSimpleType](_util_util_.md#parsesimpletype) |
`value` | any |

**Returns:** *boolean*

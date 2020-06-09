[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/util"](_util_util_.md)

# Module: "util/util"

## Index

### Classes

* [Util](../classes/_util_util_.util.md)

### Interfaces

* [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)

### Type aliases

* [OPTIONPARSERType](_util_util_.md#optionparsertype)
* [ParseSimpleType](_util_util_.md#parsesimpletype)

### Variables

* [logContainer](_util_util_.md#const-logcontainer)
* [logger](_util_util_.md#let-logger)

### Functions

* [isParseSimpleOption](_util_util_.md#const-isparsesimpleoption)
* [parseSimpleOption](_util_util_.md#const-parsesimpleoption)

## Type aliases

###  OPTIONPARSERType

Ƭ **OPTIONPARSERType**: *"remove_extra" | "add_extra" | "no_extra"*

*Defined in [src/util/util.ts:16](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L16)*

___

###  ParseSimpleType

Ƭ **ParseSimpleType**: *"string" | "boolean" | "number" | "object" | "any"*

*Defined in [src/util/util.ts:17](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L17)*

## Variables

### `Const` logContainer

• **logContainer**: *Container* = new Container()

*Defined in [src/util/util.ts:13](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L13)*

___

### `Let` logger

• **logger**: *any* = null

*Defined in [src/util/util.ts:43](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L43)*

## Functions

### `Const` isParseSimpleOption

▸ **isParseSimpleOption**(`type`: string): *boolean*

*Defined in [src/util/util.ts:19](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |

**Returns:** *boolean*

___

### `Const` parseSimpleOption

▸ **parseSimpleOption**(`type`: [ParseSimpleType](_util_util_.md#parsesimpletype), `value`: any): *boolean*

*Defined in [src/util/util.ts:23](https://github.com/claukers/miqro-core/blob/45c7f28/src/util/util.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [ParseSimpleType](_util_util_.md#parsesimpletype) |
`value` | any |

**Returns:** *boolean*

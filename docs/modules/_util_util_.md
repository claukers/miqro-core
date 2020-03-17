[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/util"](_util_util_.md)

# Module: "util/util"

## Index

### Classes

* [Util](../classes/_util_util_.util.md)

### Interfaces

* [ISimpleMap](../interfaces/_util_util_.isimplemap.md)

### Type aliases

* [IOPTIONPARSER](_util_util_.md#ioptionparser)
* [IParseSimpleType](_util_util_.md#iparsesimpletype)

### Variables

* [logContainer](_util_util_.md#const-logcontainer)
* [logger](_util_util_.md#const-logger)

### Functions

* [isParseSimpleOption](_util_util_.md#const-isparsesimpleoption)
* [parseSimpleOption](_util_util_.md#const-parsesimpleoption)

## Type aliases

###  IOPTIONPARSER

Ƭ **IOPTIONPARSER**: *"remove_extra" | "add_extra" | "no_extra"*

*Defined in [src/util/util.ts:13](https://github.com/claukers/miqro-core/blob/b8b0d57/src/util/util.ts#L13)*

___

###  IParseSimpleType

Ƭ **IParseSimpleType**: *"string" | "boolean" | "number" | "object" | "any"*

*Defined in [src/util/util.ts:14](https://github.com/claukers/miqro-core/blob/b8b0d57/src/util/util.ts#L14)*

## Variables

### `Const` logContainer

• **logContainer**: *Container* = new Container()

*Defined in [src/util/util.ts:10](https://github.com/claukers/miqro-core/blob/b8b0d57/src/util/util.ts#L10)*

___

### `Const` logger

• **logger**: *Logger‹›* = Util.getLogger("Util")

*Defined in [src/util/util.ts:192](https://github.com/claukers/miqro-core/blob/b8b0d57/src/util/util.ts#L192)*

## Functions

### `Const` isParseSimpleOption

▸ **isParseSimpleOption**(`type`: string): *boolean*

*Defined in [src/util/util.ts:16](https://github.com/claukers/miqro-core/blob/b8b0d57/src/util/util.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |

**Returns:** *boolean*

___

### `Const` parseSimpleOption

▸ **parseSimpleOption**(`type`: [IParseSimpleType](_util_util_.md#iparsesimpletype), `value`: any): *boolean*

*Defined in [src/util/util.ts:20](https://github.com/claukers/miqro-core/blob/b8b0d57/src/util/util.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [IParseSimpleType](_util_util_.md#iparsesimpletype) |
`value` | any |

**Returns:** *boolean*

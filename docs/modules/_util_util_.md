[miqro-core](../README.md) › [Globals](../globals.md) › ["util/util"](_util_util_.md)

# External module: "util/util"

## Index

### Classes

* [Util](../classes/_util_util_.util.md)

### Interfaces

* [ISimpleMap](../interfaces/_util_util_.isimplemap.md)

### Type aliases

* [IOPTIONPARSER](_util_util_.md#ioptionparser)
* [IParseSimpleType](_util_util_.md#iparsesimpletype)
* [IParseType](_util_util_.md#iparsetype)

### Variables

* [logContainer](_util_util_.md#const-logcontainer)
* [logger](_util_util_.md#const-logger)

### Functions

* [isParseSimpleOption](_util_util_.md#const-isparsesimpleoption)
* [parseSimpleOption](_util_util_.md#const-parsesimpleoption)

## Type aliases

###  IOPTIONPARSER

Ƭ **IOPTIONPARSER**: *"remove_extra" | "add_extra" | "no_extra"*

*Defined in [src/util/util.ts:14](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L14)*

___

###  IParseSimpleType

Ƭ **IParseSimpleType**: *"string" | "boolean" | "number" | "object" | "any"*

*Defined in [src/util/util.ts:15](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L15)*

___

###  IParseType

Ƭ **IParseType**: *"string" | "boolean" | "number" | "array" | "any"*

*Defined in [src/util/util.ts:16](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L16)*

## Variables

### `Const` logContainer

• **logContainer**: *Container* = new Container()

*Defined in [src/util/util.ts:11](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L11)*

___

### `Const` logger

• **logger**: *Logger‹›* = Util.getLogger("Util")

*Defined in [src/util/util.ts:191](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L191)*

## Functions

### `Const` isParseSimpleOption

▸ **isParseSimpleOption**(`type`: string): *boolean*

*Defined in [src/util/util.ts:18](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |

**Returns:** *boolean*

___

### `Const` parseSimpleOption

▸ **parseSimpleOption**(`type`: [IParseSimpleType](_util_util_.md#iparsesimpletype), `value`: any): *boolean*

*Defined in [src/util/util.ts:22](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/util.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [IParseSimpleType](_util_util_.md#iparsesimpletype) |
`value` | any |

**Returns:** *boolean*

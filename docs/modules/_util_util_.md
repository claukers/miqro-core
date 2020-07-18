[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/util"](_util_util_.md)

# Module: "util/util"

## Index

### Classes

* [Util](../classes/_util_util_.util.md)

### Interfaces

* [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)

### Type aliases

* [ConfigOutput](_util_util_.md#configoutput)
* [OPTIONPARSERType](_util_util_.md#optionparsertype)
* [ParseSimpleType](_util_util_.md#parsesimpletype)

### Variables

* [logContainer](_util_util_.md#const-logcontainer)
* [logger](_util_util_.md#let-logger)

### Functions

* [isParseSimpleOption](_util_util_.md#const-isparsesimpleoption)
* [parseSimpleOption](_util_util_.md#const-parsesimpleoption)

## Type aliases

###  ConfigOutput

Ƭ **ConfigOutput**: *[SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string›*

*Defined in [src/util/util.ts:38](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L38)*

___

###  OPTIONPARSERType

Ƭ **OPTIONPARSERType**: *"remove_extra" | "add_extra" | "no_extra"*

*Defined in [src/util/util.ts:9](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L9)*

___

###  ParseSimpleType

Ƭ **ParseSimpleType**: *"string" | "boolean" | "number" | "object" | "any"*

*Defined in [src/util/util.ts:10](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L10)*

## Variables

### `Const` logContainer

• **logContainer**: *Map‹string, [Logger](../interfaces/_util_logger_.logger.md)›* = new Map<string, Logger>()

*Defined in [src/util/util.ts:16](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L16)*

___

### `Let` logger

• **logger**: *any* = null

*Defined in [src/util/util.ts:40](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L40)*

## Functions

### `Const` isParseSimpleOption

▸ **isParseSimpleOption**(`type`: string): *boolean*

*Defined in [src/util/util.ts:12](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |

**Returns:** *boolean*

___

### `Const` parseSimpleOption

▸ **parseSimpleOption**(`type`: [ParseSimpleType](_util_util_.md#parsesimpletype), `value`: any): *boolean*

*Defined in [src/util/util.ts:18](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/util.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [ParseSimpleType](_util_util_.md#parsesimpletype) |
`value` | any |

**Returns:** *boolean*

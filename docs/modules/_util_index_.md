[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/index"](_util_index_.md)

# Module: "util/index"

## Index

### References

* [CLIUtil](_util_index_.md#cliutil)
* [CMDMapType](_util_index_.md#cmdmaptype)
* [ConfigFileNotFoundError](_util_index_.md#configfilenotfounderror)
* [ConfigPathResolver](_util_index_.md#configpathresolver)
* [FeatureToggle](_util_index_.md#featuretoggle)
* [ForbiddenError](_util_index_.md#forbiddenerror)
* [MethodNotImplementedError](_util_index_.md#methodnotimplementederror)
* [ParseOptionsError](_util_index_.md#parseoptionserror)
* [SimpleMapInterface](_util_index_.md#simplemapinterface)
* [StopWatch](_util_index_.md#stopwatch)
* [UnAuthorizedError](_util_index_.md#unauthorizederror)
* [Util](_util_index_.md#util)
* [defaultLogFormat](_util_index_.md#defaultlogformat)
* [defaultLoggerFactory](_util_index_.md#defaultloggerfactory)
* [winstonConfig](_util_index_.md#winstonconfig)

### Classes

* [GroupPolicy](../classes/_util_index_.grouppolicy.md)

### Interfaces

* [GroupPolicyOptionsInterface](../interfaces/_util_index_.grouppolicyoptionsinterface.md)

### Type aliases

* [GroupPolicyInterface](_util_index_.md#grouppolicyinterface)
* [GroupPolicyItemInterface](_util_index_.md#grouppolicyiteminterface)

### Functions

* [policyCheck](_util_index_.md#const-policycheck)

## References

###  CLIUtil

• **CLIUtil**:

___

###  CMDMapType

• **CMDMapType**:

___

###  ConfigFileNotFoundError

• **ConfigFileNotFoundError**:

___

###  ConfigPathResolver

• **ConfigPathResolver**:

___

###  FeatureToggle

• **FeatureToggle**:

___

###  ForbiddenError

• **ForbiddenError**:

___

###  MethodNotImplementedError

• **MethodNotImplementedError**:

___

###  ParseOptionsError

• **ParseOptionsError**:

___

###  SimpleMapInterface

• **SimpleMapInterface**:

___

###  StopWatch

• **StopWatch**:

___

###  UnAuthorizedError

• **UnAuthorizedError**:

___

###  Util

• **Util**:

___

###  defaultLogFormat

• **defaultLogFormat**:

___

###  defaultLoggerFactory

• **defaultLoggerFactory**:

___

###  winstonConfig

• **winstonConfig**:

## Type aliases

###  GroupPolicyInterface

Ƭ **GroupPolicyInterface**: *"at_least_one" | "all"*

*Defined in [src/util/index.ts:15](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/index.ts#L15)*

___

###  GroupPolicyItemInterface

Ƭ **GroupPolicyItemInterface**: *string | string[]*

*Defined in [src/util/index.ts:17](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/index.ts#L17)*

## Functions

### `Const` policyCheck

▸ **policyCheck**(`session`: [SessionInterface](../interfaces/_service_common_index_.sessioninterface.md), `options`: [GroupPolicyOptionsInterface](../interfaces/_util_index_.grouppolicyoptionsinterface.md)): *boolean*

*Defined in [src/util/index.ts:24](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/index.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`session` | [SessionInterface](../interfaces/_service_common_index_.sessioninterface.md) |
`options` | [GroupPolicyOptionsInterface](../interfaces/_util_index_.grouppolicyoptionsinterface.md) |

**Returns:** *boolean*

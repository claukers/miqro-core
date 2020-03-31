[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/index"](_util_index_.md)

# Module: "util/index"

## Index

### References

* [CLIUtil](_util_index_.md#cliutil)
* [ConfigFileNotFoundError](_util_index_.md#configfilenotfounderror)
* [ConfigPathResolver](_util_index_.md#configpathresolver)
* [FeatureToggle](_util_index_.md#featuretoggle)
* [ForbiddenError](_util_index_.md#forbiddenerror)
* [ICMDMap](_util_index_.md#icmdmap)
* [ISimpleMap](_util_index_.md#isimplemap)
* [MethodNotImplementedError](_util_index_.md#methodnotimplementederror)
* [ParseOptionsError](_util_index_.md#parseoptionserror)
* [StopWatch](_util_index_.md#stopwatch)
* [UnAuthorizedError](_util_index_.md#unauthorizederror)
* [Util](_util_index_.md#util)
* [defaultLogFormat](_util_index_.md#defaultlogformat)
* [defaultLoggerFactory](_util_index_.md#defaultloggerfactory)
* [winstonConfig](_util_index_.md#winstonconfig)

### Classes

* [GroupPolicy](../classes/_util_index_.grouppolicy.md)

### Interfaces

* [IGroupPolicyOptions](../interfaces/_util_index_.igrouppolicyoptions.md)

### Type aliases

* [IGroupPolicy](_util_index_.md#igrouppolicy)
* [IGroupPolicyItem](_util_index_.md#igrouppolicyitem)

### Functions

* [policyCheck](_util_index_.md#const-policycheck)

## References

###  CLIUtil

• **CLIUtil**:

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

###  ICMDMap

• **ICMDMap**:

___

###  ISimpleMap

• **ISimpleMap**:

___

###  MethodNotImplementedError

• **MethodNotImplementedError**:

___

###  ParseOptionsError

• **ParseOptionsError**:

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

###  IGroupPolicy

Ƭ **IGroupPolicy**: *"at_least_one" | "all"*

*Defined in [src/util/index.ts:13](https://github.com/claukers/miqro-core/blob/6617130/src/util/index.ts#L13)*

___

###  IGroupPolicyItem

Ƭ **IGroupPolicyItem**: *string | string[]*

*Defined in [src/util/index.ts:15](https://github.com/claukers/miqro-core/blob/6617130/src/util/index.ts#L15)*

## Functions

### `Const` policyCheck

▸ **policyCheck**(`session`: [ISession](../interfaces/_service_common_index_.isession.md), `options`: [IGroupPolicyOptions](../interfaces/_util_index_.igrouppolicyoptions.md)): *boolean*

*Defined in [src/util/index.ts:22](https://github.com/claukers/miqro-core/blob/6617130/src/util/index.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`session` | [ISession](../interfaces/_service_common_index_.isession.md) |
`options` | [IGroupPolicyOptions](../interfaces/_util_index_.igrouppolicyoptions.md) |

**Returns:** *boolean*

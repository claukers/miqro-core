[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/index"](_util_index_.md)

# Module: "util/index"

## Index

### References

* [CLIUtil](_util_index_.md#cliutil)
* [CMDMapType](_util_index_.md#cmdmaptype)
* [ConfigFileNotFoundError](_util_index_.md#configfilenotfounderror)
* [ConfigPathResolver](_util_index_.md#configpathresolver)
* [ConsoleLogger](_util_index_.md#consolelogger)
* [ConsoleLoggerEvents](_util_index_.md#consoleloggerevents)
* [DefaultLogger](_util_index_.md#defaultlogger)
* [FeatureToggle](_util_index_.md#featuretoggle)
* [ForbiddenError](_util_index_.md#forbiddenerror)
* [Formatter](_util_index_.md#formatter)
* [LogLevel](_util_index_.md#loglevel)
* [Logger](_util_index_.md#logger)
* [LoggerFactory](_util_index_.md#loggerfactory)
* [MethodNotImplementedError](_util_index_.md#methodnotimplementederror)
* [ParseOptionsError](_util_index_.md#parseoptionserror)
* [SimpleMapInterface](_util_index_.md#simplemapinterface)
* [StopWatch](_util_index_.md#stopwatch)
* [UnAuthorizedError](_util_index_.md#unauthorizederror)
* [Util](_util_index_.md#util)
* [WriteArgs](_util_index_.md#writeargs)
* [WriteEventArgs](_util_index_.md#writeeventargs)
* [defaultLoggerFactory](_util_index_.md#defaultloggerfactory)
* [defaultLoggerFormat](_util_index_.md#defaultloggerformat)
* [getLoggerFactory](_util_index_.md#getloggerfactory)
* [loadSequelizeRC](_util_index_.md#loadsequelizerc)

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

###  ConsoleLogger

• **ConsoleLogger**:

___

###  ConsoleLoggerEvents

• **ConsoleLoggerEvents**:

___

###  DefaultLogger

• **DefaultLogger**:

___

###  FeatureToggle

• **FeatureToggle**:

___

###  ForbiddenError

• **ForbiddenError**:

___

###  Formatter

• **Formatter**:

___

###  LogLevel

• **LogLevel**:

___

###  Logger

• **Logger**:

___

###  LoggerFactory

• **LoggerFactory**:

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

###  WriteArgs

• **WriteArgs**:

___

###  WriteEventArgs

• **WriteEventArgs**:

___

###  defaultLoggerFactory

• **defaultLoggerFactory**:

___

###  defaultLoggerFormat

• **defaultLoggerFormat**:

___

###  getLoggerFactory

• **getLoggerFactory**:

___

###  loadSequelizeRC

• **loadSequelizeRC**:

## Type aliases

###  GroupPolicyInterface

Ƭ **GroupPolicyInterface**: *"at_least_one" | "all"*

*Defined in [src/util/index.ts:16](https://github.com/claukers/miqro-core/blob/64522a7/src/util/index.ts#L16)*

___

###  GroupPolicyItemInterface

Ƭ **GroupPolicyItemInterface**: *string | string[]*

*Defined in [src/util/index.ts:18](https://github.com/claukers/miqro-core/blob/64522a7/src/util/index.ts#L18)*

## Functions

### `Const` policyCheck

▸ **policyCheck**(`session`: [SessionInterface](../interfaces/_service_common_.sessioninterface.md), `options`: [GroupPolicyOptionsInterface](../interfaces/_util_index_.grouppolicyoptionsinterface.md)): *boolean*

*Defined in [src/util/index.ts:25](https://github.com/claukers/miqro-core/blob/64522a7/src/util/index.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`session` | [SessionInterface](../interfaces/_service_common_.sessioninterface.md) |
`options` | [GroupPolicyOptionsInterface](../interfaces/_util_index_.grouppolicyoptionsinterface.md) |

**Returns:** *boolean*

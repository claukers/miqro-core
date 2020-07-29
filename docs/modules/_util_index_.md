[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/index"](_util_index_.md)

# Module: "util/index"

## Index

### References

* [CLIUtil](_util_index_.md#cliutil)
* [CMDMapType](_util_index_.md#cmdmaptype)
* [ConfigFileNotFoundError](_util_index_.md#configfilenotfounderror)
* [ConfigOutput](_util_index_.md#configoutput)
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
* [OPTIONPARSERType](_util_index_.md#optionparsertype)
* [ParseOptionsError](_util_index_.md#parseoptionserror)
* [ParseSimpleType](_util_index_.md#parsesimpletype)
* [RequestOptions](_util_index_.md#requestoptions)
* [ResponseError](_util_index_.md#responseerror)
* [SimpleMap](_util_index_.md#simplemap)
* [SimpleTypes](_util_index_.md#simpletypes)
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

* [GroupPolicyOptions](../interfaces/_util_index_.grouppolicyoptions.md)
* [NoTokenSession](../interfaces/_util_index_.notokensession.md)
* [Session](../interfaces/_util_index_.session.md)
* [VerifyTokenService](../interfaces/_util_index_.verifytokenservice.md)

### Type aliases

* [GroupPolicyGroups](_util_index_.md#grouppolicygroups)
* [GroupPolicyType](_util_index_.md#grouppolicytype)

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

###  ConfigOutput

• **ConfigOutput**:

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

###  OPTIONPARSERType

• **OPTIONPARSERType**:

___

###  ParseOptionsError

• **ParseOptionsError**:

___

###  ParseSimpleType

• **ParseSimpleType**:

___

###  RequestOptions

• **RequestOptions**:

___

###  ResponseError

• **ResponseError**:

___

###  SimpleMap

• **SimpleMap**:

___

###  SimpleTypes

• **SimpleTypes**:

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

###  GroupPolicyGroups

Ƭ **GroupPolicyGroups**: *string | string[]*

*Defined in [src/util/index.ts:31](https://github.com/claukers/miqro-core/blob/4c91395/src/util/index.ts#L31)*

___

###  GroupPolicyType

Ƭ **GroupPolicyType**: *"at_least_one" | "all"*

*Defined in [src/util/index.ts:29](https://github.com/claukers/miqro-core/blob/4c91395/src/util/index.ts#L29)*

## Functions

### `Const` policyCheck

▸ **policyCheck**(`session`: [Session](../interfaces/_util_index_.session.md), `options`: [GroupPolicyOptions](../interfaces/_util_index_.grouppolicyoptions.md)): *boolean*

*Defined in [src/util/index.ts:38](https://github.com/claukers/miqro-core/blob/4c91395/src/util/index.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`session` | [Session](../interfaces/_util_index_.session.md) |
`options` | [GroupPolicyOptions](../interfaces/_util_index_.grouppolicyoptions.md) |

**Returns:** *boolean*

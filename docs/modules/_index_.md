[miqro-core](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Classes

* [CLIUtil](../classes/_index_.cliutil.md)
* [ConfigFileNotFoundError](../classes/_index_.configfilenotfounderror.md)
* [ConfigPathResolver](../classes/_index_.configpathresolver.md)
* [FeatureToggle](../classes/_index_.featuretoggle.md)
* [ForbiddenError](../classes/_index_.forbiddenerror.md)
* [GroupPolicy](../classes/_index_.grouppolicy.md)
* [MethodNotImplementedError](../classes/_index_.methodnotimplementederror.md)
* [ParseOptionsError](../classes/_index_.parseoptionserror.md)
* [StopWatch](../classes/_index_.stopwatch.md)
* [UnAuthorizedError](../classes/_index_.unauthorizederror.md)
* [Util](../classes/_index_.util.md)

### Interfaces

* [ICMDMap](../interfaces/_index_.icmdmap.md)
* [IGroupPolicyOptions](../interfaces/_index_.igrouppolicyoptions.md)
* [INoTokenSession](../interfaces/_index_.inotokensession.md)
* [IServiceArgs](../interfaces/_index_.iserviceargs.md)
* [ISession](../interfaces/_index_.isession.md)
* [ISimpleMap](../interfaces/_index_.isimplemap.md)
* [IVerifyTokenService](../interfaces/_index_.iverifytokenservice.md)

### Type aliases

* [IGroupPolicy](_index_.md#igrouppolicy)
* [IGroupPolicyItem](_index_.md#igrouppolicyitem)

### Variables

* [defaultLogFormat](_index_.md#const-defaultlogformat)

### Functions

* [defaultLoggerFactory](_index_.md#const-defaultloggerfactory)
* [winstonConfig](_index_.md#const-winstonconfig)

## Type aliases

###  IGroupPolicy

Ƭ **IGroupPolicy**: *"at_least_one" | "all"*

*Defined in [src/util/index.ts:13](https://github.com/claukers/miqro-core/blob/45acabd/src/util/index.ts#L13)*

___

###  IGroupPolicyItem

Ƭ **IGroupPolicyItem**: *string | string[]*

*Defined in [src/util/index.ts:15](https://github.com/claukers/miqro-core/blob/45acabd/src/util/index.ts#L15)*

## Variables

### `Const` defaultLogFormat

• **defaultLogFormat**: *Format‹›* = printf((info) => {
  const pid = process.pid;
  const envString = pid;
  const component = info.label;
  const level = info.level;
  const text = info.message;
  const ret = `${new Date(info.timestamp).getTime()} ${envString} ` +
    `[${component}] ` +
    `${level !== "info" ? (level === "error" || level === "warn" ? `[${level.toUpperCase()}] ` : `[${level}] `) : ""}` +
    `${text}`;
  return ret;
})

*Defined in [src/util/loader.ts:14](https://github.com/claukers/miqro-core/blob/45acabd/src/util/loader.ts#L14)*

## Functions

### `Const` defaultLoggerFactory

▸ **defaultLoggerFactory**(`identifier`: any): *object*

*Defined in [src/util/loader.ts:27](https://github.com/claukers/miqro-core/blob/45acabd/src/util/loader.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | any |

**Returns:** *object*

* **format**: *Format‹›* = combine(
      label({
        label: identifier
      }),
      timestamp(),
      logFormat
    )

* **transports**: *any[]* = transportList

___

### `Const` winstonConfig

▸ **winstonConfig**(): *any*

*Defined in [src/util/loader.ts:61](https://github.com/claukers/miqro-core/blob/45acabd/src/util/loader.ts#L61)*

**Returns:** *any*

[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/index"](_util_index_.md)

# Module: "util/index"

## Index

### Classes

* [CLIUtil](../classes/_util_index_.cliutil.md)
* [ConfigFileNotFoundError](../classes/_util_index_.configfilenotfounderror.md)
* [ConfigPathResolver](../classes/_util_index_.configpathresolver.md)
* [FeatureToggle](../classes/_util_index_.featuretoggle.md)
* [ForbiddenError](../classes/_util_index_.forbiddenerror.md)
* [GroupPolicy](../classes/_util_index_.grouppolicy.md)
* [MethodNotImplementedError](../classes/_util_index_.methodnotimplementederror.md)
* [ParseOptionsError](../classes/_util_index_.parseoptionserror.md)
* [StopWatch](../classes/_util_index_.stopwatch.md)
* [UnAuthorizedError](../classes/_util_index_.unauthorizederror.md)
* [Util](../classes/_util_index_.util.md)

### Interfaces

* [ICMDMap](../interfaces/_util_index_.icmdmap.md)
* [IGroupPolicyOptions](../interfaces/_util_index_.igrouppolicyoptions.md)
* [ISimpleMap](../interfaces/_util_index_.isimplemap.md)

### Type aliases

* [IGroupPolicy](_util_index_.md#igrouppolicy)
* [IGroupPolicyItem](_util_index_.md#igrouppolicyitem)

### Variables

* [defaultLogFormat](_util_index_.md#const-defaultlogformat)

### Functions

* [defaultLoggerFactory](_util_index_.md#const-defaultloggerfactory)
* [winstonConfig](_util_index_.md#const-winstonconfig)

## Type aliases

###  IGroupPolicy

Ƭ **IGroupPolicy**: *"at_least_one" | "all"*

*Defined in [src/util/index.ts:13](https://github.com/claukers/miqro-core/blob/05bc2b3/src/util/index.ts#L13)*

___

###  IGroupPolicyItem

Ƭ **IGroupPolicyItem**: *string | string[]*

*Defined in [src/util/index.ts:15](https://github.com/claukers/miqro-core/blob/05bc2b3/src/util/index.ts#L15)*

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

*Defined in [src/util/loader.ts:14](https://github.com/claukers/miqro-core/blob/05bc2b3/src/util/loader.ts#L14)*

## Functions

### `Const` defaultLoggerFactory

▸ **defaultLoggerFactory**(`identifier`: any): *object*

*Defined in [src/util/loader.ts:27](https://github.com/claukers/miqro-core/blob/05bc2b3/src/util/loader.ts#L27)*

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

*Defined in [src/util/loader.ts:61](https://github.com/claukers/miqro-core/blob/05bc2b3/src/util/loader.ts#L61)*

**Returns:** *any*

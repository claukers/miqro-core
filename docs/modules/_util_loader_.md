[miqro-core](../README.md) › [Globals](../globals.md) › ["util/loader"](_util_loader_.md)

# Module: "util/loader"

## Index

### Variables

* [defaultLogFormat](_util_loader_.md#const-defaultlogformat)

### Functions

* [defaultLoggerFactory](_util_loader_.md#const-defaultloggerfactory)
* [winstonConfig](_util_loader_.md#const-winstonconfig)

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

*Defined in [src/util/loader.ts:14](https://github.com/claukers/miqro-core/blob/d98b47c/src/util/loader.ts#L14)*

## Functions

### `Const` defaultLoggerFactory

▸ **defaultLoggerFactory**(`identifier`: any): *object*

*Defined in [src/util/loader.ts:27](https://github.com/claukers/miqro-core/blob/d98b47c/src/util/loader.ts#L27)*

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

*Defined in [src/util/loader.ts:61](https://github.com/claukers/miqro-core/blob/d98b47c/src/util/loader.ts#L61)*

**Returns:** *any*

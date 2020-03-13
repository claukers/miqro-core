[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/loader"](_util_loader_.md)

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
  const component = info.label;
  const level = info.level;
  const text = info.message;
  return `${new Date(info.timestamp).getTime()} ${pid} ` +
    `[${component}] ` +
    `${level !== "info" ? (level === "error" || level === "warn" ? `[${level.toUpperCase()}] ` : `[${level}] `) : ""}` +
    `${text}`;
})

*Defined in [src/util/loader.ts:15](https://github.com/claukers/miqro-core/blob/6562042/src/util/loader.ts#L15)*

## Functions

### `Const` defaultLoggerFactory

▸ **defaultLoggerFactory**(`identifier`: any): *object*

*Defined in [src/util/loader.ts:26](https://github.com/claukers/miqro-core/blob/6562042/src/util/loader.ts#L26)*

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

*Defined in [src/util/loader.ts:60](https://github.com/claukers/miqro-core/blob/6562042/src/util/loader.ts#L60)*

**Returns:** *any*

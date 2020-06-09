[@miqro/core](../README.md) › [Globals](../globals.md) › ["cli/create"](_cli_create_.md)

# Module: "cli/create"

## Index

### Variables

* [logger](_cli_create_.md#const-logger)
* [serviceName](_cli_create_.md#const-servicename)
* [servicePath](_cli_create_.md#const-servicepath)
* [servicesFolderPath](_cli_create_.md#const-servicesfolderpath)

## Variables

### `Const` logger

• **logger**: *Console* = console

*Defined in [src/cli/create.ts:6](https://github.com/claukers/miqro-core/blob/4ce290b/src/cli/create.ts#L6)*

___

### `Const` serviceName

• **serviceName**: *string* = process.argv[3]

*Defined in [src/cli/create.ts:7](https://github.com/claukers/miqro-core/blob/4ce290b/src/cli/create.ts#L7)*

___

### `Const` servicePath

• **servicePath**: *string* = resolve(servicesFolderPath, `${serviceName.toLowerCase()}.js`)

*Defined in [src/cli/create.ts:26](https://github.com/claukers/miqro-core/blob/4ce290b/src/cli/create.ts#L26)*

___

### `Const` servicesFolderPath

• **servicesFolderPath**: *string* = ConfigPathResolver.getServiceDirname()

*Defined in [src/cli/create.ts:18](https://github.com/claukers/miqro-core/blob/4ce290b/src/cli/create.ts#L18)*

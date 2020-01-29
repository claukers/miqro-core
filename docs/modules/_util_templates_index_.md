[miqro-core](../README.md) › [Globals](../globals.md) › ["util/templates/index"](_util_templates_index_.md)

# Module: "util/templates/index"

## Index

### Variables

* [defaultEnvFile](_util_templates_index_.md#const-defaultenvfile)
* [gitignore](_util_templates_index_.md#const-gitignore)

### Functions

* [indexjs](_util_templates_index_.md#const-indexjs)
* [mainjs](_util_templates_index_.md#const-mainjs)

### Object literals

* [templates](_util_templates_index_.md#const-templates)

## Variables

### `Const` defaultEnvFile

• **defaultEnvFile**: *"####################
## logging
LOG_LEVEL="debug"
LOG_LEVEL_Sequelize="error"
LOG_FILE=./logs/development.log
#LOG_FILE_TRACE=./logs/development-trace.log
####################
## features
FEATURE_TOGGLE_BODYPARSER=true
#FEATURE_TOGGLE_MY_CUSTOM_FEATURE=true
####################
## body-parser
BODYPARSER_INFLATE=true
BODYPARSER_LIMIT="100kb"
BODYPARSER_STRICT=true
BODYPARSER_TYPE="application/json"
####################
## db
DB_NAME=devdb
DB_HOST=localhost
DB_PORT=3306
# should be loadad from a secret manager into process.env.DB_USER
DB_USER=
# should be loadad from a secret manager into process.env.DB_PASS
DB_PASS=
DB_DIALECT=sqlite
DB_DIALECT_SSL="true"
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDDLE=10000
DB_STORAGE=./dev.sqlite3
DB_DROPTABLES=false
####################
## express
PORT=8080
HTTPS_ENABLE=false
# should be loadad from a secret manager into process.env.HTTPS_KEY
#HTTPS_KEY=
# should be loadad from a secret manager into process.env.HTTPS_CERT
#HTTPS_CERT=
####################
## jsonwebtoken
JWT_HEADER=Authorization
# should be loadad from a secret manager into process.env.JWT_SECRET
#JWT_SECRET=
#JWT_EXPIRATION=3d
####################
"* = `####################
## logging
LOG_LEVEL="debug"
LOG_LEVEL_Sequelize="error"
LOG_FILE=./logs/development.log
#LOG_FILE_TRACE=./logs/development-trace.log
####################
## features
FEATURE_TOGGLE_BODYPARSER=true
#FEATURE_TOGGLE_MY_CUSTOM_FEATURE=true
####################
## body-parser
BODYPARSER_INFLATE=true
BODYPARSER_LIMIT="100kb"
BODYPARSER_STRICT=true
BODYPARSER_TYPE="application/json"
####################
## db
DB_NAME=devdb
DB_HOST=localhost
DB_PORT=3306
# should be loadad from a secret manager into process.env.DB_USER
DB_USER=
# should be loadad from a secret manager into process.env.DB_PASS
DB_PASS=
DB_DIALECT=sqlite
DB_DIALECT_SSL="true"
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDDLE=10000
DB_STORAGE=./dev.sqlite3
DB_DROPTABLES=false
####################
## express
PORT=8080
HTTPS_ENABLE=false
# should be loadad from a secret manager into process.env.HTTPS_KEY
#HTTPS_KEY=
# should be loadad from a secret manager into process.env.HTTPS_CERT
#HTTPS_CERT=
####################
## jsonwebtoken
JWT_HEADER=Authorization
# should be loadad from a secret manager into process.env.JWT_SECRET
#JWT_SECRET=
#JWT_EXPIRATION=3d
####################
`

*Defined in [src/util/templates/index.ts:2](https://github.com/claukers/miqro-core/blob/45acabd/src/util/templates/index.ts#L2)*

___

### `Const` gitignore

• **gitignore**: *"config/log.js
config/db.js
logs/
db/models/index.js
node_modules/
*.sqlite3
.sequelizerc
"* = `config/log.js
config/db.js
logs/
db/models/index.js
node_modules/
*.sqlite3
.sequelizerc
`

*Defined in [src/util/templates/index.ts:53](https://github.com/claukers/miqro-core/blob/45acabd/src/util/templates/index.ts#L53)*

## Functions

### `Const` indexjs

▸ **indexjs**(): *string*

*Defined in [src/util/templates/index.ts:83](https://github.com/claukers/miqro-core/blob/45acabd/src/util/templates/index.ts#L83)*

**Returns:** *string*

___

### `Const` mainjs

▸ **mainjs**(`servicePath`: any): *string*

*Defined in [src/util/templates/index.ts:63](https://github.com/claukers/miqro-core/blob/45acabd/src/util/templates/index.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`servicePath` | any |

**Returns:** *string*

## Object literals

### `Const` templates

### ▪ **templates**: *object*

*Defined in [src/util/templates/index.ts:135](https://github.com/claukers/miqro-core/blob/45acabd/src/util/templates/index.ts#L135)*

###  defaultEnvFile

• **defaultEnvFile**: *string*

*Defined in [src/util/templates/index.ts:140](https://github.com/claukers/miqro-core/blob/45acabd/src/util/templates/index.ts#L140)*

###  gitignore

• **gitignore**: *string*

*Defined in [src/util/templates/index.ts:136](https://github.com/claukers/miqro-core/blob/45acabd/src/util/templates/index.ts#L136)*

###  indexjs

• **indexjs**: *indexjs*

*Defined in [src/util/templates/index.ts:138](https://github.com/claukers/miqro-core/blob/45acabd/src/util/templates/index.ts#L138)*

###  mainjs

• **mainjs**: *mainjs*

*Defined in [src/util/templates/index.ts:139](https://github.com/claukers/miqro-core/blob/45acabd/src/util/templates/index.ts#L139)*

###  servicejs

• **servicejs**: *servicejs*

*Defined in [src/util/templates/index.ts:137](https://github.com/claukers/miqro-core/blob/45acabd/src/util/templates/index.ts#L137)*

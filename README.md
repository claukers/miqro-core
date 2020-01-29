# miqro-core

**in early development not to use in production**

this is a part of the ```miqro``` module and provides logging, config and option parsing.

- Utility for loading a **dotenv** file located at ```<MIQRO_DIRNAME>config/<NODE_ENV>.env```.
- Utility for creating loggers using autogenerated winston config in ```config/log.js```.
- Utility for parsing option objects attribute types.
- Utility for FeatureToggling.

```javascript
const {
  Util,
  FeatureToggle
} = require("miqro-core");

// this should load the correct env file
Util.loadConfig();

// this logger will use the transports configured in config/log.js
// also this logger will respect LOG_LEVEL_MyIdentifier=debug|warn|info|error Env var as its log level
const logger = Util.getLogger("MyIdentifier");
logger.info("infolog");
logger.warn("warnlog");
logger.error("errorlog");
logger.debug("debuglog");

// this will check if FEATURE_TOGGLE_BODYPARSER env var is set to true.
// this will crash your app if FEATURE_TOGGLE_BODYPARSER is not set.
// consider adding FEATURE_TOGGLE_<yourfeature>=true|false in your config/<NODE_ENV>.env file
if(FeatureToggle.isFeatureEnabled("bodyparser")) {
  logger.info("bodyparser feature enabled");
}


const data = {
  name: "aa",
  age: 0,
  likes:["cc", "dd"],
  extra: "bb"
};
// this will throw a ParseOptionError with a message like person.extra is not expected.
/*const { name, age } = Util.parseOptions("person", data, [
  { name: "name", type: "string", required: true },
  { name: "age", type: "number", required: true },
  { name: "likes", type: "array", required: true, arrayType: "string" }
], "no_extra");*/

// this will not
const resultWithExtra = Util.parseOptions("person", data, [
  { name: "name", type: "string", required: true },
  { name: "age", type: "number", required: true },
  { name: "likes", type: "array", required: true, arrayType: "string" }
], "add_extra");

// neither will this
const resultWithoutExtra = Util.parseOptions("person", data, [
  { name: "name", type: "string", required: true },
  { name: "age", type: "number", required: true },
  { name: "likes", type: "array", required: true, arrayType: "string" }
], "ignore_extra");
```

# env files

TODO

# setup log level per identifier

TODO

## documentation

[globals](docs/globals.md)

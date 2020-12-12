# @miqro/core

this module provides helpers functions to develop nodejs applications like **logging**, **config** and **request parsing**

```javascript
const {
  request,
  loadConfig,
  loadConfigFile,
  getLogger,
  isFeatureEnabled,
  parseOptions,
} = require("@miqro/core");

// this should load env files in config/$NODE_ENV/*.env into process.env
loadConfig();

// this should load env files in directoryPath into process.env
loadConfig(directoryPath);

// force the load of an env file into process.env
loadConfigFile("other.env");

// this will throw if ENV_VAR_A doesnt exists
checkEnvVariables(["ENV_VAR_A"]);

// creating a logger with getLogger(...) will set the level of the logger to LOG_LEVEL_MyIdentifier=debug|warn|info|error Env var as its a valid log level
const logger = getLogger("MyIdentifier");
logger.info("infolog");
logger.warn("warnlog");
logger.error("errorlog");
logger.debug("debuglog");
// this logger will NOT respect env var LOG_LEVEL_MyIdentifier and will be force to use debug
// const logger = new Logger("MyIdentifier", "debug", {
//   transports: [
//     {
//       write: ...
//     }
//   ],
//   formmater: ...
// });

// this is a wrapper for https|http request method using a Promise that follows redirects
const response = await request({
    url:...,
    ignoreRedirect: false,
    ....
});

// this will check if FEATURE_TOGGLE_BODY_PARSER env var is set to true.
if(isFeatureEnabled("body_parser")) {
  logger.info("body_parser feature enabled");
}

const data = {
  name: "aa",
  age: 0,
  likes:["cc", "dd"],
  extra: "bb"
};
// this will throw a ParseOptionError with a message like person.extra is not expected.
/*const { name, age } = parseOptions("person", data, [
  { name: "name", type: "string", required: true },
  { name: "age", type: "number", required: true },
  { name: "likes", type: "array", required: true, arrayType: "string" }
], "no_extra");*/

// this will not and "resultWithExtra" will have any extra attrs data may have
const resultWithExtra = parseOptions("person", data, [
  { name: "name", type: "string", required: true },
  { name: "age", type: "number", required: true },
  { name: "likes", type: "array", required: true, arrayType: "string" }
], "add_extra");

// neither will this, but this will discard the extra attrs in data in "resultWithoutExtra"
const resultWithoutExtra = parseOptions("person", data, [
  { name: "name", type: "string", required: true },
  { name: "age", type: "number", required: true },
  { name: "likes", type: "array", required: true, arrayType: "string" }
], "remove_extra");
```


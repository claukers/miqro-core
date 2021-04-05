# @miqro/core

this module provides helpers functions to develop nodejs applications like **logging**, **config** and **request parsing**


```javascript
const {
  request,
  loadConfig,
  loadConfigFile,
  getLogger,
  isFeatureEnabled,
  parse,
} = require("@miqro/core");

// this should load env files in config/$NODE_ENV/*.env into process.env
loadConfig();

// this should load env files in directoryPath into process.env
loadConfig(directoryPath);

// force the load of an env file into process.env
loadConfigFile("other.env");

// this will throw if ENV_VAR_A doesnt exists
checkEnvVariables(["ENV_VAR_A"]);
// this will not throw if ENV_VAR_B doesnt exists and will use 'DEFAULT_VALUE' as the value
const [ENV_VAR_B] = checkEnvVariables(["ENV_VAR_B"], ["DEFAULT_VALUE"]);

// creating a logger with getLogger(...) will set the level of the logger to LOG_LEVEL_MyIdentifier=debug|warn|info|error Env var as its a valid log level
const logger = getLogger("MyIdentifier");
logger.info("infolog");
logger.warn("warnlog");
logger.error("errorlog");
logger.debug("debuglog");

// this is a wrapper for https|http request method using a Promise that follows redirects
const response = await request({
    url:...,
    method: ...,
    query: {
      ...
    },
    headers: {
      ...
    },
    followRedirect: false, // defaults to false
    maxRedirects: // defaults to 10
    data: ...
});

// this will check if BODY_PARSER env var is set to 'true'.
if(isFeatureEnabled("body_parser")) {
  logger.info("body_parser feature enabled");
}

const data = {
  name: "aa",
  age: "0",
  likes:["cc", "dd"],
  extra: "bb"
};
const parsed = parse("person", data, {
  name: "string",
  age: "number",
  likes: {
    required: true,
    type: "array",
    arrayType: "string"
  }
}, "remove_extra");

```

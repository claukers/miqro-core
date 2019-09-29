const logjs =
  `const path = require("path");
const winston = require("winston");
const {
  format
} = winston;
const {
  combine,
  label,
  printf,
  timestamp
} = format;

["LOG_FILE", "LOG_FILE_TRACE"].forEach((envName) => {
  if (process.env[envName] === undefined) {
    throw new Error(\`Env variable [\${envName}!] not defined\`);
  }
});

const logFormat = printf((info) => {
  const pid = process.pid;
  const envString = pid;
  const component = info.label;
  const level = info.level;
  const text = info.message;
  const ret = \`\${new Date(info.timestamp).getTime()} \${envString} \` +
    \`[\${component}] \` +
    \`\${level !== "info" ? (level === "error" || level === "warn" ? \`[\${level.toUpperCase()}] \` : \`[\${level}] \`) : ""}\` +
    \`\${text}\`;
  return ret;
});

module.exports = (identifier) => {
  const level = process.env[\`LOG_LEVEL_\${identifier}\`] || process.env.LOG_LEVEL;
  return {
    format: combine(
      label({
        label: identifier
      }),
      timestamp(),
      logFormat
    ),
    transports: [
      new winston.transports.Console({
        level
      }),
      new winston.transports.File({
        level,
        filename: path.resolve(process.env.LOG_FILE)
      }),
      new winston.transports.File({
        level: "silly",
        filename: path.resolve(process.env.LOG_FILE_TRACE)
      })
    ]

  };
};
`;

export const defaultEnvFile = `####################
## logging
LOG_LEVEL="debug"
LOG_LEVEL_Sequelize="error"
####################
## body-parser
#BODYPARSER_INFLATE=true
#BODYPARSER_LIMIT="100kb"
#BODYPARSER_STRICT=true
#BODYPARSER_TYPE="application/json"
####################
## db
#DB_NAME=devdb
#DB_HOST=localhost
#DB_PORT=3306
# should be loadad from a secret manager into process.env.DB_USER
#DB_USER=
# should be loadad from a secret manager into process.env.DB_PASS
#DB_PASS=
#DB_DIALECT=sqlite
#DB_DIALECT_SSL="true"
#DB_POOL_MAX=5
#DB_POOL_MIN=0
#DB_POOL_ACQUIRE=30000
#DB_POOL_IDDLE=10000
#DB_STORAGE=./dev.sqlite3
#DB_DROPTABLES=false
####################
## express
#PORT=8080
#HTTPS_ENABLE=false
# should be loadad from a secret manager into process.env.HTTPS_KEY
#HTTPS_KEY=
# should be loadad from a secret manager into process.env.HTTPS_CERT
#HTTPS_CERT=
####################
## jsonwebtoken
#JWT_HEADER=X-MYSERVICE-TOKEN
# should be loadad from a secret manager into process.env.JWT_SECRET
#JWT_SECRET=
#JWT_EXPIRATION=3d
####################
`;

export const gitignore = `config/log.js
logs/
node_modules/
*.sqlite3
`;

export const templates = {
  gitignore,
  defaultEnvFile,
  logjs
};

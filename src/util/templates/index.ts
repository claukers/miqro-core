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

export const defaultEnvFile = `# db
# logging
LOG_LEVEL="info"
LOG_LEVEL_Sequelize="error"
# body-parser
BODYPARSER_INFLATE=true
BODYPARSER_LIMIT="100kb"
BODYPARSER_STRICT=true
BODYPARSER_TYPE="application/json"
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

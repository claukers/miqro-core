// eslint-disable-next-line @typescript-eslint/no-var-requires
const {Logger} = require("./../../../../src");

module.exports = ({identifier, level, formatter}) => {
  return new Logger("blo", "debug", formatter);
};

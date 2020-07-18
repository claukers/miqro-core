import {Util} from "../util";

const logger = console;

if (process.argv.length !== 3) {
  // noinspection SpellCheckingInspection
  throw new Error(`usage: miqro-core config-bash`);
}

const configOut = Util.getConfig();

const config = configOut.combined;
const keys = Object.keys(config);

for (const key of keys) {
  logger.info(`export ${key}=${config[key]}`);
}

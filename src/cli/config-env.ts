import {Util} from "../util";

const logger = console;

if (process.argv.length !== 3) {
  // noinspection SpellCheckingInspection
  throw new Error(`usage: miqro-core config-env`);
}

const configOut = Util.getConfig();

const config = configOut.combined;
const keys = Object.keys(config);

for (const key of keys) {
  logger.info(`${key}=${config[key]}`);
}

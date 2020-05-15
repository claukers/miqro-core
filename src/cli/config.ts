import {Util} from "../util";

const logger = console;

if (process.argv.length !== 3) {
  // noinspection SpellCheckingInspection
  throw new Error(`usage: miqro-core config`);
}

const configOut = Util.getConfig(true);

const config = configOut.combined;

logger.info(JSON.stringify(config, undefined, 2));

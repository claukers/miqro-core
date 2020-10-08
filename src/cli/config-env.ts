import {Util} from "../util";

export const main = (): void => {
  const logger = console;

  if (process.argv.length !== 3) {
    // noinspection SpellCheckingInspection
    throw new Error(`usage: miqro config-env`);
  }

  const configOut = Util.getConfig();

  const config = configOut.combined;
  const keys = Object.keys(config);

  for (const key of keys) {
    logger.info(`${key}=${config[key]}`);
  }
}

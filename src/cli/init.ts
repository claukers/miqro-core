import {existsSync, writeFileSync} from "fs";
import {basename, dirname, resolve} from "path";
import {Util} from "../util";
import {ConfigPathResolver} from "../util/config";
import {templates} from "../util/templates";

const logger = console;

if (process.argv.length !== 3) {
  throw new Error(`usage: miqro-core init`);
}

const service = resolve(ConfigPathResolver.getBaseDirname(), `index.js`);

if (!existsSync(service)) {
  // noinspection SpellCheckingInspection
  logger.warn(`microservice [${service}] doesnt exists!`);
  logger.warn(`creating [${service}]!`);
  // noinspection SpellCheckingInspection
  const mainjsPath = resolve(dirname(service), "main.js");
  writeFileSync(service, templates.indexjs());
  // noinspection SpellCheckingInspection
  if (!existsSync(mainjsPath)) {
    // noinspection SpellCheckingInspection
    writeFileSync(mainjsPath, templates.mainjs(basename(service)));
  }
}

Util.setupInstanceEnv("init", service);
Util.loadConfig(true);

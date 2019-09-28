"use strict";
import * as  path from "path";
import { Util } from "../util";

export const winstonConfig = () => {
  Util.checkEnvVariables(["MIQRO_DIRNAME"]);
  const logPath = path.resolve(process.env.MIQRO_DIRNAME, "config", "log.js");
  const logConfig = require(logPath);
  return logConfig;
};

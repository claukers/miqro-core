#!/usr/bin/env node

import {resolve} from "path";
import {CLIUtil} from "../util";

// noinspection SpellCheckingInspection
CLIUtil.cliFlow({
  init: {module: resolve(__dirname, "init"), description: "inits your config folder (MIQRO_DIRNAME)"},
  config: {module: resolve(__dirname, "config"), description: "outputs to stdout the config as a json"},
  ["config-bash"]: {module: resolve(__dirname, "configBash"), description: "outputs to stdout the config as a bash script"},
  createservice: {module: resolve(__dirname, "create"), description: "create a service."}
}, "miqro-core", console);

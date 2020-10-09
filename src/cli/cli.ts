#!/usr/bin/env node

import {CLIUtil} from "../util";
import {main as init} from "./init";
import {main as config} from "./config";
import {main as configBash} from "./config-bash";
import {main as configEnv} from "./config-env";

// noinspection SpellCheckingInspection
CLIUtil.cliFlow({
  init: {cb: init, description: "\tinits your config folder"},
  config: {cb: config, description: "\toutputs to stdout the config as a json"},
  ["config-bash"]: {
    cb: configBash,
    description: "outputs to stdout the config as a bash script"
  },
  ["config-env"]: {cb: configEnv, description: "outputs to stdout the config as a env file"}
}, "usage: npx @miqro/core <command> [args]", console);

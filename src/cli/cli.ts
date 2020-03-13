#!/usr/bin/env node

import {resolve} from "path";
import {CLIUtil} from "../util";

// noinspection SpellCheckingInspection
CLIUtil.cliFlow({
  init: {module: resolve(__dirname, "init"), description: "inits your config folder (MIQRO_DIRNAME)"},
  createservice: {module: resolve(__dirname, "create"), description: "create a service."}
}, "miqro-core", console);

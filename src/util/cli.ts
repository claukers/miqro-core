import {SimpleMapInterface} from "./util";

// noinspection SpellCheckingInspection
export type CMDMapType = SimpleMapInterface<{ module: string; description: string }>

export abstract class CLIUtil {
  // noinspection SpellCheckingInspection
  public static cliFlow(cmds: CMDMapType, identifier: string, logger): void {
    try {
      CLIUtil.routeCMDModule(cmds, identifier, logger);
    } catch (e) {
      logger.error(`usage: ${identifier} <command> [args]`);
      logger.error(e.message);
      process.exit(1);
    }
  }

  // noinspection SpellCheckingInspection
  public static routeCMDModule(cmds: CMDMapType, identifier: string, logger): void {
    const cmdArg = process.argv[2];
    if (!cmdArg) {
      logger.info(`usage: ${identifier} <command> [args]`);
      logger.info(`Available commands:`);
      for (const cmd of Object.keys(cmds)) {
        logger.info(`\t${cmd}\t${cmds[cmd].description}`);
      }
      throw new Error("no command");
    } else {
      if (!cmds[cmdArg]) {
        logger.info(`Available commands:`);
        for (const cmdName of Object.keys(cmds)) {
          logger.info(`\t${cmdName}\t${cmds[cmdName].description}`);
        }
        throw new Error("command " + cmdArg + " not found!");
      } else {
        try {
          require(cmds[cmdArg].module);
        } catch (e) {
          logger.error(e.message);
          process.exit(1);
        }
      }
    }
  }
}

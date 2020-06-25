import {SimpleMapInterface} from "./util";
import {Logger} from "./logger";

// noinspection SpellCheckingInspection
export type CMDMapType = SimpleMapInterface<{ module: string; description: string }>

export abstract class CLIUtil {
  // noinspection SpellCheckingInspection
  public static cliFlow(cmds: CMDMapType, identifier: string, logger: Logger | Console): void {
    try {
      CLIUtil.routeCMDModule(cmds, identifier, logger);
    } catch (e) {
      logger.error(e.message);
      logger.info(`usage: ${identifier} <command> [args]`);
      logger.info(`Available commands:`);
      for (const cmd of Object.keys(cmds)) {
        logger.info(`\t${cmd}\t${cmds[cmd].description}`);
      }
      process.exit(1);
    }
  }

  // noinspection SpellCheckingInspection
  public static routeCMDModule(cmds: CMDMapType, identifier: string, logger: Logger | Console): void {
    const cmdArg = process.argv[2];
    if (!cmdArg) {
      throw new Error("no command");
    } else {
      if (!cmds[cmdArg]) {
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

import {SimpleMap} from "./parser";
import {Logger} from "./logger";

export type CB<T> = () => T;

// noinspection SpellCheckingInspection
export type CMDMapType = SimpleMap<{ cb: CB<void> | CB<Promise<void>>; description: string }>

export abstract class CLIUtil {
  // noinspection SpellCheckingInspection
  public static cliFlow(cmds: CMDMapType, usage: string, logger: Logger | Console): void {
    const flow = async () => {
      try {
        await CLIUtil.routeCMDModule(cmds, logger);
      } catch (e) {
        logger.error(e.message);
        logger.info(`${usage}`);
        logger.info(`Available commands:`);
        for (const cmd of Object.keys(cmds)) {
          logger.info(`\t${cmd}\t${cmds[cmd].description}`);
        }
        process.exit(1);
      }
    }
    flow().catch((e) => {
      logger.error(e);
    });
  }

  // noinspection SpellCheckingInspection
  public static async routeCMDModule(cmds: CMDMapType, logger: Logger | Console): Promise<void> {
    const cmdArg = process.argv[2];
    if (!cmdArg) {
      throw new Error("no command");
    } else {
      if (!cmds[cmdArg]) {
        throw new Error("command " + cmdArg + " not found!");
      } else {
        try {
          await cmds[cmdArg].cb();
        } catch (e) {
          logger.error(e.message);
          process.exit(1);
        }
      }
    }
  }
}

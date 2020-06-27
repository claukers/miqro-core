import {EventEmitter} from "events";
import {loadSequelizeRC, SimpleMapInterface, Util} from "../util";

// noinspection SpellCheckingInspection
export type DataBaseState = "stopped" | "starting" | "started" | "startstop" | "error";

export type IModelMap = SimpleMapInterface<any>

let logger = null;

const sequelizeModule = "sequelize";

export class Database extends EventEmitter {
  // noinspection SpellCheckingInspection
  public static events: DataBaseState[] = ["stopped", "starting", "started", "startstop", "error"];

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private static instance: Database = null;
  public readonly models: IModelMap = {};
  public readonly sequelize: any;
  public readonly Op: any;
  private state: DataBaseState = "stopped";

  constructor() {
    super();
    if (logger === null) {
      logger = Util.getLogger("Database");
    }
    // noinspection SpellCheckingInspection
    const requiredEnvVariables = ["DB_DROPTABLES"];
    Util.checkEnvVariables(requiredEnvVariables);
    Util.checkModules([sequelizeModule]);
    const paths = loadSequelizeRC();
    Util.checkModules([paths.modelsFolder]);
    /* eslint-disable  @typescript-eslint/no-var-requires */
    const models = require(paths.modelsFolder);
    this.sequelize = models.sequelize;
    /* eslint-disable  @typescript-eslint/no-var-requires */
    const {Op} = require(sequelizeModule);
    this.Op = Op;
    (this.sequelize as any).log = (text): void => {
      logger.debug(text);
    };
    Object.keys(models).forEach((modelName) => {
      if (modelName !== "sequelize" && modelName !== "Sequelize") {
        this.models[modelName] = models[modelName];
      }
    });
  }

  public async transaction(transactionCB: (t: any) => PromiseLike<any>): Promise<any> {
    await this.sequelize.transaction((t: any) => {
      return transactionCB(t);
    });
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public async query(q: { query: string; values: any[] }, t?: any): Promise<any> {
    if (t) {
      return this.sequelize.query(q, {transaction: t});
    } else {
      return this.sequelize.query(q);
    }
  }

  public async start(): Promise<void> {
    if (this.state !== "stopped") {
      throw new Error("DataBase not stopped!");
    }
    this.stateChange("starting");
    return new Promise<void>((resolve, reject) => {
      this.sequelize
        .authenticate()
        .then(async () => {
          if (process.env.DB_DROPTABLES === "true") {
            const tR = [];
            for (const name of Object.keys(this.models)) {
              const model = this.models[name];
              tR.push(model.sync({
                force: true
              }));
            }
            await Promise.all(tR);
          }
          this.stateChange("started");
          resolve();
        }).catch((e) => {
        this.stateChange("error", e);
        reject();
      });
    });
  }

  public async stop(): Promise<void> {
    if (this.state !== "started") {
      const err = new Error("DataBase not started!");
      this.emit("error", err);
      throw err;
    }
    try {
      // noinspection SpellCheckingInspection
      this.stateChange("startstop");
      await this.sequelize.close();
      this.stateChange("stopped");
    } catch (e) {
      this.stateChange("error", e);
      throw e;
    }
  }

  private stateChange(state: DataBaseState, args?: any): void {
    if (Database.events.indexOf(state) !== -1) {
      this.state = state;
      this.emit(this.state, args);
    } else {
      throw new Error("Unknown state");
    }
  }
}

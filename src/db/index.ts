import {EventEmitter} from "events";
import {loadSequelizeRC, ConfigPathResolver, SimpleMap, Util} from "../util";

// noinspection SpellCheckingInspection
export type DataBaseState = "stopped" | "starting" | "started" | "startstop" | "error";

export class Database extends EventEmitter {

  private static instance: Database;

  public static getInstance(): Database {
    if (!Database.instance) Database.instance = new Database();
    return Database.instance;
  }

  // noinspection SpellCheckingInspection
  public static events: DataBaseState[] = ["stopped", "starting", "started", "startstop", "error"];
  public readonly models: SimpleMap<any> = {};
  public readonly sequelize: any;
  public readonly Sequelize: any;
  private state: DataBaseState = "stopped";

  constructor(sequelizercPath = ConfigPathResolver.getSequelizeRCFilePath(), private logger = Util.getLogger("Database")) {
    super();
    const paths = loadSequelizeRC(sequelizercPath);
    let models: any;
    try {
      /* eslint-disable  @typescript-eslint/no-var-requires */
      models = require(paths.modelsFolder);
    } catch (e) {
      this.emit("error", e);
      throw e;
    }
    this.sequelize = models.sequelize;
    this.Sequelize = models.Sequelize;
    /* eslint-disable  @typescript-eslint/no-var-requires */
    (this.sequelize as any).log = (text: string): void => {
      this.logger.debug(text);
    };
    Object.keys(models).forEach((modelName) => {
      if (modelName !== "sequelize" && modelName !== "Sequelize") {
        this.models[modelName] = models[modelName];
      }
    });
  }

  public async transaction(transactionCB: (transaction: any) => PromiseLike<any>): Promise<any> {
    await this.sequelize.transaction((transaction: any) => transactionCB(transaction));
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
          this.stateChange("started");
          resolve();
        }).catch((e: Error) => {
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

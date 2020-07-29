export class StopWatch {
  private lastMS: number;
  private startMS: number;
  constructor() {
    this.lastMS = new Date().getTime();
    this.startMS = this.lastMS;
  }
  // noinspection JSUnusedGlobalSymbols
  public lap(): number {
    const now = new Date().getTime();
    const ret = now - this.lastMS;
    this.lastMS = new Date().getTime();
    return ret;
  }
  public stop(): number {
    const now = new Date().getTime();
    const ret = now - this.startMS;
    this.lastMS = new Date().getTime();
    this.startMS = this.lastMS;
    return ret;
  }
}

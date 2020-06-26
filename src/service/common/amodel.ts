import {ModelServiceInterface, ModelServiceArgsInterface} from "./model";
import {MethodNotImplementedError} from "../../util/error";

export abstract class AbstractModelService implements ModelServiceInterface {
  // noinspection JSUnusedLocalSymbols
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  public async get(options: ModelServiceArgsInterface): Promise<any> {
    throw new MethodNotImplementedError("Method not implemented.");
  }

  // noinspection JSUnusedLocalSymbols
  public async post(options: ModelServiceArgsInterface): Promise<any> {
    throw new MethodNotImplementedError("Method not implemented.");
  }

  // noinspection JSUnusedLocalSymbols
  public async put(options: ModelServiceArgsInterface): Promise<any> {
    throw new MethodNotImplementedError("Method not implemented.");
  }

  // noinspection JSUnusedLocalSymbols
  public async patch(options: ModelServiceArgsInterface): Promise<any> {
    throw new MethodNotImplementedError("Method not implemented.");
  }

  // noinspection JSUnusedLocalSymbols
  public async delete(options: ModelServiceArgsInterface): Promise<any> {
    throw new MethodNotImplementedError("Method not implemented.");
  }
}

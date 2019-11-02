import {NamedError} from "./named";

export class MethodNotImplementedError extends NamedError {
  constructor(method: string) {
    super(`method ${method} not implemented!`);
    this.name = "MethodNotImplementedError";
  }
}

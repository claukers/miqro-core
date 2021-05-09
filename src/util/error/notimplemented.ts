import {NamedError} from "./named";

export class MethodNotImplementedError extends NamedError {
  constructor(method = "NOT FOUND") {
    super(`method ${method} not implemented!`);
    this.name = "MethodNotImplementedError";
  }
}

import {NamedError} from "./named";

export class UnAuthorizedError extends NamedError {
  constructor(message: string) {
    super(message);
    this.name = "UnAuthorizedError";
  }
}

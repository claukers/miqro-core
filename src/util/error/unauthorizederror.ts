import {NamedError} from "./named";

export class UnAuthorizedError extends NamedError {
  constructor(message = "UNAUTHORIZED") {
    super(message);
    this.name = "UnAuthorizedError";
  }
}

import {NamedError} from "./named";

export class ForbiddenError extends NamedError {
  constructor(message = "FORBIDDEN") {
    super(message);
    this.name = "ForbiddenError";
  }
}

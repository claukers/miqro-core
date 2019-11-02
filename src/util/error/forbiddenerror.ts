import {NamedError} from "./named";

export class ForbiddenError extends NamedError {
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
  }
}

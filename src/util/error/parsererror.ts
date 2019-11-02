import {NamedError} from "./named";

export class ParseOptionsError extends NamedError {
  constructor(message: string) {
    super(message);
    this.name = "ParseOptionsError";
  }
}

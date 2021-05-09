import {NamedError} from "./named";

export class ParseOptionsError extends NamedError {
  constructor(message = "BAD REQUEST", public argAttr?: string) {
    super(message);
    this.name = "ParseOptionsError";
  }
}

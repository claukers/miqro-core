import {NamedError} from "./named";

export class ParseOptionsError extends NamedError {
  constructor(message: string, public argAttr?: string) {
    super(message);
    this.name = "ParseOptionsError";
  }
}

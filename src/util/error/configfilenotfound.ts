import {NamedError} from "./named";

export class ConfigFileNotFoundError extends NamedError {
  constructor(message: string) {
    super(message);
    this.name = "ConfigFileNotFoundError";
  }
}

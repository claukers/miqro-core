import {NamedError} from "./named";

export class ConfigFileNotFoundError extends NamedError {
  constructor(message = "NOT FOUND") {
    super(message);
    this.name = "ConfigFileNotFoundError";
  }
}

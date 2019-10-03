export class ForbidenError extends Error {
  public isForbidenError = true; // fucking instanceof of transpiled typescript!
  constructor(message: string) {
    super(message);
  }
}

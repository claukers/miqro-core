export class UnAuthorizedError extends Error {
  public isUnAuthorizeError = true; // fucking instanceof of transpiled typescript!
  constructor(message: string) {
    super(message);
  }
}

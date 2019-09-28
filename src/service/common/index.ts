import { IAPIRequest } from "../../route";
import { ISimpleMap } from "../../util";

export interface INoTokenSession {
  account: string;
  username: string;
  groups: string[];
}

export class MethodNotImplementedError extends Error {
  public isMethodNotImplementedError = true;
  constructor(method: string) {
    super(`method ${method} not implemented!`);
  }
}

export interface ISession extends INoTokenSession {
  token: string;
}

export interface IServiceArgs extends ISimpleMap<any> {
  session: ISession;
  params: ISimpleMap<any>;
  query: ISimpleMap<any>;
  body: ISimpleMap<any>;
  headers: ISimpleMap<any>;
}

export class ServiceArg implements IServiceArgs {
  public session: ISession;
  public params: ISimpleMap<any>;
  public method: string;
  public query: ISimpleMap<any>;
  public body: ISimpleMap<any>;
  public headers: ISimpleMap<any>;
  public constructor(req: IAPIRequest) {
    this.method = req.method;
    this.session = req.session;
    this.params = req.params;
    this.query = req.query;
    this.body = req.body;
    this.headers = req.headers;
  }
}

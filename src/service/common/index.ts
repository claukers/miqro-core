import { ISimpleMap } from "../../util";

export interface INoTokenSession {
  account: string;
  username: string;
  groups: string[];
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

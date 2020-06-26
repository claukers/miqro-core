import {ParseOptionsError, SimpleMapInterface, Util} from "../../util";
import {Database} from "../db";

export interface ModelServiceArgsInterface {
  body: SimpleMapInterface<any>;
  query: SimpleMapInterface<string>;
  params: SimpleMapInterface<string>;
}

export interface ModelServiceInterface {
  get(options: ModelServiceArgsInterface, transaction?: any, skipLocked?: boolean): Promise<any>;

  post(options: ModelServiceArgsInterface, transaction?: any): Promise<any>;

  put(options: ModelServiceArgsInterface, transaction?: any): Promise<any>;

  patch(options: ModelServiceArgsInterface, transaction?: any): Promise<any>;

  delete(options: ModelServiceArgsInterface, transaction?: any): Promise<any>;
}

export const parseIncludeQuery = (includeQuery: any[]): any[] => {
  const ret = [];
  for (const includeModel of includeQuery) {
    if (typeof includeModel === "string") {
      const model = Database.getInstance().models[includeModel];
      if (model) {
        ret.push(model);
      } else {
        throw new ParseOptionsError(`query.include[${includeModel}] model doesnt exists!`);
      }
    } else if (typeof includeModel === "object") {
      const includeO = Util.parseOptions("query.include[n]", includeModel, [
        {name: "model", type: "string", required: true},
        {name: "required", type: "boolean", required: true},
        {name: "where", type: "object", required: true},
        {name: "include", type: "array", arrayType: "any", required: false}
      ], "no_extra");
      const model = Database.getInstance().models[includeO.model];
      if (model) {
        if (includeO.include) {
          ret.push({
            model,
            required: includeO.required,
            where: includeO.where,
            include: parseIncludeQuery(includeO.include)
          });
        } else {
          ret.push({
            model,
            required: includeO.required,
            where: includeO.where
          });
        }
      } else {
        throw new ParseOptionsError(`query.include[${includeO.model}] model doesnt exists!`);
      }
    } else {
      throw new ParseOptionsError(`problem with your query.include!`);
    }
  }
  return ret;
};

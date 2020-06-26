import {Util} from "../util/util";
import {AbstractModelService, ModelServiceArgsInterface, parseIncludeQuery} from "./common";
import {ParseOptionsError} from "../util/error";
import {Database} from "./db";

export class ModelService extends AbstractModelService {
  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  constructor(protected model: any) {
    super();
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public async get({body, query, params}: ModelServiceArgsInterface, transaction?: any, skipLocked?: boolean): Promise<any> {
    const {pagination, include, order} = Util.parseOptions("query", query, [
      {name: "include", type: "string", required: false},
      {name: "pagination", type: "string", required: false},
      {name: "order", type: "string", required: false}
    ], "no_extra");
    let includeModels = [];
    if (include) {
      let includeList = [];
      try {
        includeList = JSON.parse(include);
      } catch (e) {
        throw new ParseOptionsError(`query.include not a valid JSON`);
      }
      includeModels = parseIncludeQuery(includeList);
    }
    let paginationJSON;
    if (pagination) {
      try {
        paginationJSON = JSON.parse(pagination);
      } catch (e) {
        throw new ParseOptionsError(`query.pagination not a valid JSON`);
      }
      Util.parseOptions("query.pagination", paginationJSON, [
        {name: "limit", type: "number", required: true},
        {name: "search", type: "object", required: false},
        {name: "offset", type: "number", required: true}
      ], "no_extra");
      if (paginationJSON.search) {
        Util.parseOptions("query.pagination.search", paginationJSON.search, [
          {name: "columns", type: "array", arrayType: "string", required: true},
          {name: "query", type: "string", required: true}
        ], "no_extra");
      }
    }
    let orderJSON;
    if (order) {
      try {
        orderJSON = JSON.parse(order);
      } catch (e) {
        throw new ParseOptionsError(`query.order not a valid JSON`);
      }
    }
    Util.parseOptions("body", body, [], "no_extra");
    let ret;
    if (pagination) {
      const Op = Database.getInstance().Op;
      if (paginationJSON.search) {
        if (paginationJSON.search.columns.length > 0) {
          const searchParams = {};
          for (const column of paginationJSON.search.columns) {
            searchParams[column] = {
              [Op.like]: "%" + paginationJSON.search.query + "%"
            };
          }
          params = {
            [Op.and]: params,
            [Op.or]: searchParams
          } as any;
        }
      }
      if (transaction) {
        ret = await this.model.findAndCountAll({
          where: params,
          order: orderJSON,
          include: includeModels,
          limit: paginationJSON.limit,
          offset: paginationJSON.offset,
          transaction,
          lock: true,
          skipLocked
        });
      } else {
        ret = await this.model.findAndCountAll({
          where: params,
          order: orderJSON,
          include: includeModels,
          limit: paginationJSON.limit,
          offset: paginationJSON.offset
        });
      }
    } else {
      if (transaction) {
        ret = await this.model.findAll({
          where: params,
          order: orderJSON,
          include: includeModels,
          transaction,
          lock: true,
          skipLocked
        });
      } else {
        ret = await this.model.findAll({
          where: params,
          order: orderJSON,
          include: includeModels
        });
      }
    }
    return ret;
  }

  public async post({body, query, params}: ModelServiceArgsInterface, transaction?: any): Promise<any> {
    Util.parseOptions("params", params, [], "no_extra");
    Util.parseOptions("query", query, [], "no_extra");
    // noinspection JSDeprecatedSymbols
    if (transaction) {
      return this.model.create(body, {transaction});
    } else {
      // noinspection JSDeprecatedSymbols
      return this.model.create(body);
    }
  }

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public async patch({body, query, params}: ModelServiceArgsInterface, transaction?: any): Promise<any> {
    Util.parseOptions("query", query, [], "no_extra");
    const instances = await this.get({
      body: {},
      query,
      params
    }, transaction);
    if (instances.length === 1) {
      if (transaction) {
        return instances[0].update(body, {transaction});
      } else {
        return instances[0].update(body);
      }
    } else {
      return null;
    }
  }

  public async delete({body, query, params}: ModelServiceArgsInterface, transaction?: any): Promise<any> {
    Util.parseOptions("query", query, [], "no_extra");
    Util.parseOptions("body", body, [], "no_extra");
    const instances = await this.get({
      body: {},
      query,
      params
    }, transaction);
    if (instances.length === 1) {
      if (transaction) {
        return instances[0].destroy({transaction});
      } else {
        return instances[0].destroy();
      }
    } else {
      return null;
    }
  }
}

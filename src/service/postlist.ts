import {ModelService} from "./smodel";
import {ModelServiceArgsInterface} from "./model";
import {Util} from "../util";

export class PostListModelService extends ModelService {

  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  public async post(args: ModelServiceArgsInterface, transaction?: any): Promise<any> {
    if (args.body instanceof Array) {
      Util.parseOptions("params", args.params, [], "no_extra");
      Util.parseOptions("query", args.query, [], "no_extra");
      // noinspection JSDeprecatedSymbols
      if (transaction) {
        return this.model.bulkCreate(args.body, {transaction});
      } else {
        return this.model.bulkCreate(args.body);
      }
    } else {
      return super.post(args, transaction);
    }
  }
}

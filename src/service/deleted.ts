import {PostListModelService} from "./postlist";
import {ModelServiceArgs} from "./model";

export class FakeDeleteModelService extends PostListModelService {
  protected modelIsDeletedAttribute = "deleted";

  public async get(args: ModelServiceArgs): Promise<any> {
    args.params[this.modelIsDeletedAttribute] = false as any;
    return super.get(args);
  }

  public async delete(args: ModelServiceArgs): Promise<any> {
    args.body[this.modelIsDeletedAttribute] = true;
    return super.patch(args);
  }

  public async patch(args: ModelServiceArgs): Promise<any> {
    if (args.body[this.modelIsDeletedAttribute]) {
      delete args.body[this.modelIsDeletedAttribute];
    }
    return super.patch(args);
  }

  public async post(args: ModelServiceArgs): Promise<any> {
    if (args.body instanceof Array) {
      for (const rBody of args.body) {
        rBody[this.modelIsDeletedAttribute] = false;
      }
      return super.post(args);
    } else {
      args.body[this.modelIsDeletedAttribute] = false;
      return super.post(args);
    }
  }
}

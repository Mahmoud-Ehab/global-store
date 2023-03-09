import { Review } from "../../_modules/Database/DataTypes";
import { QueryManagerInterface } from "../../_modules/Database/QueryManagerInterface";
import { QueryStrategy } from "../../_modules/Server/QueryStrategy";

export class ReviewStrategy extends QueryStrategy<Review> {
  constructor(qm: QueryManagerInterface) {
    super(qm, "reviews");
  }
  
  getJoinUsers(filter: Partial<Review>) {
    return async () => {
      const controller = this.qm.getController(this.type) as any;
      return await controller.getJoin({
        table: "users",
        key1: "user_id",
        key2: "users.id"
      }, filter);
    }
  }
}
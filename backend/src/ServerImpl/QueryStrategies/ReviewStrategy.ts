import { Review } from "../../_modules/Database/DataTypes";
import { QueryManager } from "../../_modules/Database/QueryManager";
import { QueryStrategy } from "../../_modules/Server/QueryStrategy";

export class ReviewStrategy extends QueryStrategy<Review> {
  constructor(qm: QueryManager) {
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
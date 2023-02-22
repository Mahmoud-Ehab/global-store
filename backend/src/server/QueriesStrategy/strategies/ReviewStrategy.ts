import { Review } from "../../../database/DataController/controllers/ReviewsController";
import QueryManager from "../../../database/QueryManager/QueryManager";
import { QueriesStrategyImp } from "../QueriesStrategyImp";

export class ReviewStrategy extends QueriesStrategyImp<Review> {
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
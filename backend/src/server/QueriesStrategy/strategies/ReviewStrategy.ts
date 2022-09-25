import { Review } from "../../../database/DataController/controllers/ReviewsController";
import { QueriesStrategyImp } from "../QueriesStrategyImp";

export class ReviewStrategy extends QueriesStrategyImp<Review> {
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
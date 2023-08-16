import { QueryManager, QueryStrategy } from "sfawd";
import { Review } from "../../DatabaseImpl/Controllers/ReviewsController";

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
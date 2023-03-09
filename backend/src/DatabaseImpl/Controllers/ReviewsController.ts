import { DataController } from "../../_modules/Database/DataController";
import { Review } from "../../_modules/Database/DataTypes";

export class ReviewsController extends DataController<Review> {
  protected parseData(data: any, all?: boolean): Review {
    const review: Review = !all ? {
      user_id: data.user_id,
      publication_id: data.publication_id,
      title: data.title,
      body: data.body
    } : {...data}
    return super.parseData(review);
  }
}

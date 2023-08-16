import { DataController } from "sfawd";

export type Review = {
  user_id: string,
  publication_id: number,
  title: string,
  body: string,
}
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

import DataController from '../DataController'
import Review from '../types/Review'

class ReviewsController extends DataController<Review> {
  async get(pubid: number, userid: string): Promise<Review> {
    try {
      const result = await this.getFiltered({
        publication_id: pubid,
        user_id: userid
      })
      return result[0];
    }
    catch (e) {
      throw e;
    }
  }

  protected parseData(data: Review): Review {
    const review: Review = {
      user_id: data.user_id,
      publication_id: data.publication_id,
      title: data.title,
      body: data.body
    }    
    return review;
  }
}

export default ReviewsController;
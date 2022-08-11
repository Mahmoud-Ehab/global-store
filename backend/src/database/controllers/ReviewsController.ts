import DataController from '../abstracts/DataController'
import Review from '../types/Review'

class ReviewsController extends DataController<Review> {
  protected parseData(data: Review): Review {
    const review: Review = {
      id: data.id,
      user_id: data.user_id,
      publication_id: data.publication_id,
      title: data.title,
      body: data.body
    }    
    return review;
  }
}

export default ReviewsController;
import PublicationsController from "../DataController/controllers/PublicationsController";
import ReviewsController from "../DataController/controllers/ReviewsController";
import UsersController from "../DataController/controllers/UsersController";

export type Controllers = {
  users: UsersController,
  publications: PublicationsController,
  reviews: ReviewsController
}

interface QueryManager {
  get users(): UsersController;
  get publications(): PublicationsController;
  get reviews(): ReviewsController;
  getController(type: keyof Controllers): 
    UsersController | 
    PublicationsController | 
    ReviewsController;
  query(func: () => Promise<any>): QueryManager;
  execute(): Promise<void>;
}

export default QueryManager;
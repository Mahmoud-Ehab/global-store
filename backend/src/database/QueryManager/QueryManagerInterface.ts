import PublicationsController from "../DataController/controllers/PublicationsController";
import ReviewsController from "../DataController/controllers/ReviewsController";
import UsersController from "../DataController/controllers/UsersController";

interface QueryManager {
  get users(): UsersController;
  get publications(): PublicationsController;
  get reviews(): ReviewsController;
  query(func: Function): QueryManager;
  execute(): Promise<void>;
}

export default QueryManager;
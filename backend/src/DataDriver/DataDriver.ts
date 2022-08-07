import DataController from './interfaces/DataControllerInterface';

import User from './types/User';
import Publication from './types/Publication';
import Review from './types/Review';

type Controllers = {
  users?: DataController<User>;
  publications?: DataController<Publication>;
  reviews?: DataController<Review>;
}

class DataDriver {
  private controllers: Controllers;

  constructor(controllers: Controllers) {
    this.controllers = controllers;
  }

  setControllers(controllers: Controllers) {
    this.controllers = controllers;
  }

  getUsers = () => this.controllers.users;
  getPublications = () => this.controllers.publications;
  getReviews = () => this.controllers.reviews;
}

export default DataDriver;

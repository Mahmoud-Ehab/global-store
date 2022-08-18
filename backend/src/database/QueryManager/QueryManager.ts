import { Client } from "pg";

import QueryManagerInterface from "./QueryManagerInterface";

import Queries from "../Queries/Queries";
import UsersController from '../DataController/controllers/UsersController'
import PublicationsController from '../DataController/controllers/PublicationsController'
import ReviewsController from '../DataController/controllers/ReviewsController'


class QueryManager implements QueryManagerInterface{
  private client: Client;
  private queriesQueue: Array<Function> = [];

  private usersController: UsersController;
  private publicationsController: PublicationsController;
  private reviewsController: ReviewsController;

  get users() {
    return this.usersController;
  }
  get publications() {
    return this.publicationsController;
  }
  get reviews() {
    return this.reviewsController;
  }

  private connect(): Promise<void> {
    this.client = new Client({
      host: 'localhost',
      user: 'mahmoudehab',
      password: 'admin',
      database: 'globalstore',
    });
    this.usersController = new UsersController(
      this.client, 
      new Queries('users')
    );
    this.publicationsController = new PublicationsController(
      this.client, 
      new Queries('publications')
    );
    this.reviewsController = new ReviewsController(
      this.client, 
      new Queries('reviews')
    );

    return this.client.connect();
  }

  private disconnect(): void {
    const endFunc = async () => this.client.end();
    this.queriesQueue.push(endFunc);
  }

  query(func: Function): void {
    const pushQuery = () => this.queriesQueue.push(func);
    if (this.queriesQueue.length === 0)
      this.connect().then(() => pushQuery());
    else
      pushQuery();
  }

  async execute(): Promise<boolean | Error> {
    try {
      this.disconnect(); // push disconnect query
      while (this.queriesQueue.length > 0) {
        const queryFunc = this.queriesQueue.shift();
        if (queryFunc) await queryFunc();
      }
      return true;
    }
    catch (e) {
      throw e;
    }
  }
}

export default QueryManager;
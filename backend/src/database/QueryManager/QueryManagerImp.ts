import { Client } from "pg";

import QueryManagerInterface from "./QueryManager";

import QueryGeneratorImp from "../QueryGenerator/QueryGeneratorImp";
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
      new QueryGeneratorImp('users')
    );
    this.publicationsController = new PublicationsController(
      this.client, 
      new QueryGeneratorImp('publications')
    );
    this.reviewsController = new ReviewsController(
      this.client, 
      new QueryGeneratorImp('reviews')
    );

    return this.client.connect();
  }

  private disconnect(): void {
    const endFunc = async () => await this.client.end();
    this.queriesQueue.push(endFunc);
  }

  query(func: () => Promise<any>): QueryManager {
    if (this.queriesQueue.length === 0) {
      this.connect();
    }
    this.queriesQueue.push(func);
    return this;
  }

  async execute(): Promise<void> {
    try {
      this.disconnect(); // push disconnect query
      while (this.queriesQueue.length > 0) {
        const queryFunc = this.queriesQueue.shift();
        await queryFunc();
      }
    }
    catch (e) {
      // disconnect before throwing the error
      const disconnectFunc = this.queriesQueue.pop();
      await disconnectFunc();
      throw e;
    }
  }
}

export default QueryManager;
import { Client } from "pg";

import QueryManagerInterface from "./QueryManager";

import QueryGeneratorImp from "../QueryGenerator/QueryGeneratorImp";
import UsersController from '../DataController/controllers/UsersController'
import PublicationsController from '../DataController/controllers/PublicationsController'
import ReviewsController from '../DataController/controllers/ReviewsController'


class QueryManager implements QueryManagerInterface{
  private client: Client;
  private queriesQueue: Array<Function> = [];
  private inExecution: boolean = false;

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

  private async disconnect(): Promise<void> {
    if (this.queriesQueue.length === 0) {
      this.inExecution = false;
      await this.client.end();
    }
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
      if (this.inExecution) return;
      this.inExecution = true;
      while (this.queriesQueue.length > 0) {
        const queryFunc = this.queriesQueue.shift();
        await queryFunc();
      }
      await this.disconnect();
    }
    catch (e) {
      this.queriesQueue.length = 0;
      await this.disconnect();
      throw e;
    }
  }
}

export default QueryManager;
import { Client } from "pg";
import DataDriverInterface from "./interfaces/DataDriverInterface";

import UsersController from './controllers/UsersController'
import PublicationsController from './controllers/PublicationsController'
import ReviewsController from './controllers/ReviewsController'


class DataDriver implements DataDriverInterface{
  private client: Client;
  private queriesQueue: Array<Function>;

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

  initClient(): void {
    this.client = new Client({
      host: 'localhost',
      user: 'mahmoudehab',
      password: 'admin',
      database: 'globalstore',
    });
    this.usersController = new UsersController(this.client);
    this.publicationsController = new PublicationsController(this.client);
    this.reviewsController = new ReviewsController(this.client);
  }

  endClient(): void {
    this.client.end();
  }

  query(func: Function): void {
    this.queriesQueue.push(func);
  }

  queries(list: Function[]): void {
    this.queriesQueue.push(...list);
  }

  async execute(): Promise<boolean | Error> {
    try {
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

export default DataDriver;
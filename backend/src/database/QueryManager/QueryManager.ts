import { Client } from "pg";

import DataDriverInterface from "./QueryManagerInterface";

import Queries from "../Queries/Queries";
import UsersController from '../DataController/controllers/UsersController'
import PublicationsController from '../DataController/controllers/PublicationsController'
import ReviewsController from '../DataController/controllers/ReviewsController'


class DataDriver implements DataDriverInterface{
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

  connectClient(): void {
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
    this.client.connect();
  }

  endClient(): void {
    this.client.end();
  }

  query(func: Function): void {
    this.queriesQueue.push(func);
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
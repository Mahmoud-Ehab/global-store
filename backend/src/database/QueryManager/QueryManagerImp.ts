import { Client } from "pg"

import QueryManagerInterface, { Controllers } from "./QueryManager"

import QueryGeneratorImp from "../QueryGenerator/QueryGeneratorImp"
import UsersController, { User } from '../DataController/controllers/UsersController'
import PublicationsController, { Publication } from '../DataController/controllers/PublicationsController'
import ReviewsController, { Review } from '../DataController/controllers/ReviewsController'


class QueryManager implements QueryManagerInterface{
  private client: Client;
  private queriesQueue: Array<Function> = [];
  private inExecution: boolean = false;
  private carrier: Array<any> = []; // carries the prev queries results

  private controllers: Controllers = {
    users: null,
    publications: null,
    reviews: null
  };

  get users() {
    return this.controllers.users;
  }
  get publications() {
    return this.controllers.publications;
  }
  get reviews() {
    return this.controllers.reviews;
  }

  getController(type: keyof Controllers) {
    return this.controllers[type];
  }

  private connect(): Promise<void> {
    this.client = new Client({
      host: 'localhost',
      user: 'mahmoudehab',
      password: 'admin',
      database: 'globalstore',
    });
    this.controllers.users = new UsersController(
      this.client, 
      new QueryGeneratorImp('users')
    );
    this.controllers.publications = new PublicationsController(
      this.client, 
      new QueryGeneratorImp('publications')
    );
    this.controllers.reviews = new ReviewsController(
      this.client, 
      new QueryGeneratorImp('reviews')
    );
    return this.client.connect();
  }

  private async disconnect(): Promise<void> {
    if (this.queriesQueue.length === 0) {
      this.inExecution = false;
      this.carrier.length = 0;
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
        const result = await queryFunc();
        this.carrier.splice(0, 0, result);
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
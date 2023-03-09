import { Client } from "pg";
import { QueryManager } from "../../_modules/Database/QueryManager";
import { PostgresQueryGenerator } from "../PostgresQueryGenerator";

import { 
  UsersController,
  PublicationsController,
  ReviewsController
} from "../Controllers";

export class PostgresQueryManager extends QueryManager {
  private client: Client;

  protected connect(): Promise<void> {
    this.client = new Client({
      host: 'localhost',
      user: 'mahmoudehab',
      password: 'admin',
      database: 'globalstore',
    });
    this.controllers.users = new UsersController(
      this.client, 
      new PostgresQueryGenerator('users')
    );
    this.controllers.publications = new PublicationsController(
      this.client, 
      new PostgresQueryGenerator('publications')
    );
    this.controllers.reviews = new ReviewsController(
      this.client, 
      new PostgresQueryGenerator('reviews')
    );
    return this.client.connect();
  }

  protected async disconnect(): Promise<void> {
    if (this.queriesQueue.length === 0) {
      this.inExecution = false;
      this.carrier.length = 0;
      await this.client.end();
    }
  }
}

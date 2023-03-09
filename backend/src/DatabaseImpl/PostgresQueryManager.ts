import { QueryManager } from "../_modules/Database/QueryManager";
import { PostgresQueryGenerator } from "./PostgresQueryGenerator";

import { 
  UsersController,
  PublicationsController,
  ReviewsController
} from "./Controllers";
import { PostgresQueryHandler } from "./PostgresQueryHandler";

export class PostgresQueryManager extends QueryManager {
  private queryHandler: PostgresQueryHandler<any>;

  protected connect(): Promise<void> {
    this.queryHandler = new PostgresQueryHandler({
      host: 'localhost',
      user: 'mahmoudehab',
      password: 'admin',
      database: 'globalstore',
    });
    this.controllers.users = new UsersController(
      this.queryHandler, 
      new PostgresQueryGenerator('users')
    );
    this.controllers.publications = new PublicationsController(
      this.queryHandler, 
      new PostgresQueryGenerator('publications')
    );
    this.controllers.reviews = new ReviewsController(
      this.queryHandler, 
      new PostgresQueryGenerator('reviews')
    );
    return this.queryHandler.connect();
  }

  protected async disconnect(): Promise<void> {
    if (this.queriesQueue.length === 0) {
      this.inExecution = false;
      this.carrier.length = 0;
      await this.queryHandler.end();
    }
  }
}

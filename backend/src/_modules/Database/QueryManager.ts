import { DataController } from "./DataController";
import { User, Publication, Review } from "./Types";

export type Controllers = {
  users: DataController<User>,
  publications: DataController<Publication>,
  reviews: DataController<Review>
}

export abstract class QueryManager {
  protected queriesQueue: Array<Function> = [];
  protected carrier: Array<any> = []; // carries the prev queries results
  protected inExecution: boolean = false;

  // shall be defined in "connect" method implementations.
  protected controllers: Controllers = {
    users: undefined,
    publications: undefined,
    reviews: undefined
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

  protected connect(): Promise<void> {
    throw Error(
      `method is not implemented; a QueryHandler should 
      be initialized and thereby the controllers too.`
    );
  }

  protected async disconnect(): Promise<void> {
    throw Error(
      `method is not implemented; queriesQueue, carrier, 
      and inExceution shall get reseted.`
    );
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

import { DataController } from "./DataController";
import { User, Publication, Review } from "./DataTypes";

export type Controllers = {
  users: DataController<User>,
  publications: DataController<Publication>,
  reviews: DataController<Review>
}

export interface QueryManagerInterface {
  get users(): Controllers['users'];
  get publications(): Controllers['publications'];
  get reviews(): Controllers['reviews'];
  getController(type: keyof Controllers): Controllers[typeof type];
  query(func: () => Promise<any>): QueryManagerInterface;
  execute(): Promise<void>;
}

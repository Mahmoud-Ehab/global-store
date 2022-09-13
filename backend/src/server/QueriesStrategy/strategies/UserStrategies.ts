import { User } from "../../../database/DataController/controllers/UsersController";
import DataController from "../../../database/DataController/DataController";
import { QueriesStrategyImp } from "../QueriesStrategyImp";

export class UserStrategies extends QueriesStrategyImp<User> {
  getById(id: string | number){ 
    return async () => {
      const controller = this.qm.getController(this.type) as DataController<User>;
      const user = await controller.get(id);
      return user;
    }
  }
  getFilteredList(filter: Partial<User>) {
    return async () => {
      const controller = this.qm.getController(this.type) as DataController<User>;
      return await controller.getFiltered(filter);
    }
  }
  getLimit(limit: number){ 
    return async () => {
      const controller = this.qm.getController(this.type) as DataController<User>;
      const users = await controller.getLimit(limit);
      return users;
    }
  }
}
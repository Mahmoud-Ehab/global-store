import { User } from "../../../database/DataController/controllers/UsersController";
import DataController from "../../../database/DataController/DataController";
import { AuthenticationFailed, InteranlError } from "../../Responses";
import { QueriesStrategyImp } from "../QueriesStrategyImp";

export class UserStrategy extends QueriesStrategyImp<User> {
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

  auth(credentials: any) {
    return (async function() {
      let k = -1; while (!this.carrier[++k]);

      const userid = this.carrier[k].id || this.carrier[k][0].id;
      if (!userid) throw InteranlError;

      const auth = await this.users.auth(userid, credentials);
      if (!auth) throw AuthenticationFailed;
    }).bind(this.qm)
  }
}
import { User } from "../../../database/DataController/controllers/UsersController";
import DataController from "../../../database/DataController/DataController";
import QueryManager from "../../../database/QueryManager/QueryManager";
import { AuthenticationFailed, InteranlError } from "../../Responses";
import { QueriesStrategyImp } from "../QueriesStrategyImp";

export class UserStrategy extends QueriesStrategyImp<User> {
  constructor(qm: QueryManager) {
    super(qm, "users");
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
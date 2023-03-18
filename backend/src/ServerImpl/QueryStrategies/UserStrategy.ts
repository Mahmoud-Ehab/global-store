import { User } from "../../_modules/Database/Types";
import { QueryManager } from "../../_modules/Database/QueryManager";
import { QueryStrategy } from "../../_modules/Server/QueryStrategy";
import { 
  AuthenticationFailed, 
  InteranlError, 
  InvalidToken 
} from "../../_modules/Server/Responses";

export class UserStrategy extends QueryStrategy<User> {
  constructor(qm: QueryManager) {
    super(qm, "users");
  }
  
  auth(credentials: any) {
    return (async function() {
      const prevResult = this.carrier.get();

      const userid = prevResult.id || prevResult[0].id;
      if (!userid) throw InteranlError;

      const auth = await this.users.auth(userid, credentials);
      if (!auth) throw AuthenticationFailed;
    }).bind(this.qm)
  }

  authToken(token: string) {
    return (async function() {
      const prevResult = this.carrier.get();

      const userid = prevResult.id || prevResult[0].id;
      if (!userid) throw InteranlError;

      const valid = await this.users.authToken(userid, token);
      if (!valid) throw InvalidToken;
    }).bind(this.qm)
  }

  setToken(token: string) {
    return (async function() {
      const prevResult = this.carrier.get();

      const userid = prevResult.id || prevResult[0].id;
      if (!userid) throw InteranlError;

      const successed = await this.users.setToken(userid, token);
      if (!successed) throw InteranlError;
    }).bind(this.qm)
  }
}
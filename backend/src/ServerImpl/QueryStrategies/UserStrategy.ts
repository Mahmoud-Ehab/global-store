import { QueryManager, QueryStrategy, Responses } from "sfawd";
const { 
  AuthenticationFailed, 
  InteranlError, 
  InvalidToken 
} = Responses;

import { User } from "../../DatabaseImpl/Controllers/UsersController";

export class UserStrategy extends QueryStrategy<User> {
  constructor(qm: QueryManager) {
    super(qm, "users");
  }
  
  auth(credentials: any) {
    const controller = this.qm.getController(this.type) as any;

    return (async function() {
      const prevResult = this.carrier.get();

      const userid = prevResult.id || prevResult[0].id;
      if (!userid) throw InteranlError;

      const auth = await controller.auth(userid, credentials);
      if (!auth) throw AuthenticationFailed;
    }).bind(this.qm)
  }

  authToken(token: string) {
    const controller = this.qm.getController(this.type) as any;

    return (async function() {
      const prevResult = this.carrier.get();

      const userid = prevResult.id || prevResult[0].id;
      if (!userid) throw InteranlError;

      const valid = await controller.authToken(userid, token);
      if (!valid) throw InvalidToken;
    }).bind(this.qm)
  }

  setToken(token: string) {
    const controller = this.qm.getController(this.type) as any;

    return (async function() {
      const prevResult = this.carrier.get();

      const userid = prevResult.id || prevResult[0].id;
      if (!userid) throw InteranlError;

      const successed = await controller.setToken(userid, token);
      if (!successed) throw InteranlError;
    }).bind(this.qm)
  }
}
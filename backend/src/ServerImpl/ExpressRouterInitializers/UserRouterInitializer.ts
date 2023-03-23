import { RouterInitializer } from "../../_modules/Server/RouterInitializer";
import { QueryManager } from "../../_modules/Database/QueryManager";
import { UserEndpoints } from "../Endpoints";
import { ExpressRouter } from "../ExpressRouter";
import { UserHandler } from "../ExpressHandlers/UserHandler";

export class UserRouterInitializer extends RouterInitializer {
  constructor(qm: QueryManager) {
    super("user", new ExpressRouter(), new UserHandler(qm));
  }

  init() {
    type k = keyof typeof UserEndpoints;
    for (let key in UserEndpoints)
      this.define(UserEndpoints[key as k]);
  }
}

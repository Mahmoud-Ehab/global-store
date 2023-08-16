import { QueryManager, RouterInitializer } from "sfawd";
import { ExpressRouter } from "@sfawd/express";

import { UserEndpoints } from "../Endpoints";
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

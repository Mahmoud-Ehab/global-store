import { QueryManager, RouterInitializer } from "sfawd";
import { ExpressRouter } from "@sfawd/express";

import { ReviewEndpoints } from "../Endpoints";
import { ReviewHandler } from "../ExpressHandlers/ReviewHandler";

export class ReviewRouterInitializer extends RouterInitializer {
  constructor(qm: QueryManager) {
    super("review", new ExpressRouter(), new ReviewHandler(qm));
  }

  init() {
    type k = keyof typeof ReviewEndpoints;
    for (let key in ReviewEndpoints)
      this.define(ReviewEndpoints[key as k]);
  }
}

import { RouterInitializer } from "../../_modules/Server/RouterInitializer";
import { QueryManager } from "../../_modules/Database/QueryManager";
import { ExpressRouter } from "../ExpressRouter";
import { ReviewEndpoints } from "../Endpoints";
import { ReviewHandler } from "../ExpressRequestHandlers/ReviewHandler";

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

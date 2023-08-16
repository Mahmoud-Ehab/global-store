import { QueryManager, RouterInitializer } from "sfawd";
import { ExpressRouter } from "@sfawd/express";

import { PublicationEndpoints } from "../Endpoints";
import { PublicationHandler } from "../ExpressHandlers/PublicationHandler";

export class PublicationRouterInitializer extends RouterInitializer {
  constructor(qm: QueryManager) {
    super("publication", new ExpressRouter(), new PublicationHandler(qm));
  }

  init() {
    type k = keyof typeof PublicationEndpoints;
    for (let key in PublicationEndpoints)
      this.define(PublicationEndpoints[key as k]);
  }
}

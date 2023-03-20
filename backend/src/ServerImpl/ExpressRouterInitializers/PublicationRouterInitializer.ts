import { RouterInitializer } from "../../_modules/Server/RouterInitializer";
import { QueryManager } from "../../_modules/Database/QueryManager";
import { PublicationEndpoints } from "../Endpoints";
import { ExpressRouter } from "../ExpressRouter";
import { PublicationHandler } from "../ExpressRequestHandlers/PublicationHandler";

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

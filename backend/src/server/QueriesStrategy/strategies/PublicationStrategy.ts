import { Publication } from "../../../database/DataController/controllers/PublicationsController";
import QueryManager from "../../../database/QueryManager/QueryManager";
import { QueriesStrategyImp } from "../QueriesStrategyImp";

export class PublicationStrategy extends QueriesStrategyImp<Publication> {
  constructor(qm: QueryManager) {
    super(qm, "publications");
  }
}
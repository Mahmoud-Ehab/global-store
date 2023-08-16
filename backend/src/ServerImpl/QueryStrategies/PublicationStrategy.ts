import { QueryManager, QueryStrategy } from "sfawd";
import { Publication } from "../../DatabaseImpl/Controllers/PublicationsController";

export class PublicationStrategy extends QueryStrategy<Publication> {
  constructor(qm: QueryManager) {
    super(qm, "publications");
  }
}
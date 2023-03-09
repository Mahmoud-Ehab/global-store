import { Publication } from "../../_modules/Database/Types";
import { QueryManager } from "../../_modules/Database/QueryManager";
import { QueryStrategy } from "../../_modules/Server/QueryStrategy";

export class PublicationStrategy extends QueryStrategy<Publication> {
  constructor(qm: QueryManager) {
    super(qm, "publications");
  }
}
import { Publication } from "../../_modules/Database/DataTypes";
import { QueryManagerInterface } from "../../_modules/Database/QueryManagerInterface";
import { QueryStrategy } from "../../_modules/Server/QueryStrategy";

export class PublicationStrategy extends QueryStrategy<Publication> {
  constructor(qm: QueryManagerInterface) {
    super(qm, "publications");
  }
}
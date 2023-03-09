import { DataController } from "../../_modules/Database/DataController";
import { Publication } from "../../_modules/Database/Types";

export class PublicationsController extends DataController<Publication> {
  protected parseData(data: Publication, all?: boolean): Publication {
    const publication: Publication = !all ? {
      id: data.id,
      user_id: data.user_id,
      title: data.title,
      description: data.description,
      price: data.price,
      currency: data.currency,
      phone: data.phone
    } : {...data}
    return super.parseData(publication);
  }
}

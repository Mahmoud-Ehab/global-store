import { Builder } from "../../modules/RequestDispatcher/Builder";
import { PublicationEndpoints } from "../../../../backend/src/ServerImpl/Endpoints";

type PubInfo = {
  id: string,
  user_id: string,
  title: string,
  description: string,
  price: number,
  currency: string,
  phone: string,
}

export class PubReqBuilder extends Builder<keyof typeof PublicationEndpoints> {
  constructor() {
    super();
    type keytype = keyof typeof PublicationEndpoints;
    for (let key in PublicationEndpoints) {
      this.build(key, PublicationEndpoints[key as keytype]);
    }
  }

  get() {
    return {
      id: (pubId: string) => {
        const request_name = "publication_getById";
        return this.requests.getPublication({request_name}, pubId);
      },
      limit: (limit: number) => {
        const request_name = "publication_getLimit";
        return this.requests.getPublicationsWithLimit({request_name}, limit);
      },
      limitAndOffset: (limit: number, offset: number) => {
        const request_name = "publication_getLimitAndOffset";
        return this.requests.getPublicationsWithLimitAndOffset({request_name}, limit, offset);
      },
      ofUser: (userId: string) => {
        const request_name = "publication_getOfUser";
        return this.requests.getPublicationsOfUser({request_name}, userId);
      }
    }
  }

  create(pub: Partial<PubInfo>, token: string) {
    const request_name = "publication_create";
    return this.requests.create({request_name, ...pub, token});
  }

  update(pubIds: Pick<PubInfo, "id" | "user_id">, token: string, data: Object) {
    const request_name = "publication_update";
    return this.requests.update({request_name, ...pubIds, token, data});
  }

  remove(pubIds: Pick<PubInfo, "id" | "user_id">, token: string) {
    const request_name = "publication_delete";
    return this.requests.remove({request_name, ...pubIds, token});
  }
}

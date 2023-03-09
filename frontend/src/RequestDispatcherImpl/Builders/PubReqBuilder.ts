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
        return this.requests.getPublication({}, pubId);
      },
      limit: (limit: number) => {
        return this.requests.getPublicationsWithLimit({}, limit);
      },
      limitAndOffset: (limit: number, offset: number) => {
        return this.requests.getPublicationsWithLimitAndOffset({}, limit, offset);
      },
      ofUser: (userId: string) => {
        return this.requests.getPublicationsOfUser({}, userId);
      }
    }
  }

  create(pub: Partial<PubInfo>, token: string) {
    return this.requests.create({...pub, token});
  }

  update(pubIds: Pick<PubInfo, "id" | "user_id">, token: string, data: Object) {
    return this.requests.update({...pubIds, token, data});
  }

  remove(pubIds: Pick<PubInfo, "id" | "user_id">, token: string) {
    return this.requests.remove({...pubIds, token});
  }
}

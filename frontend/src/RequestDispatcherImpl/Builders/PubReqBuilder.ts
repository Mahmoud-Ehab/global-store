import { Builder } from "../../modules/RequestDispatcher/Builder";
import { PublicationEndpoints } from "../../../../backend/src/server/Endpoints";

type Credentials = {
  username: string,
  password: string
}

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

  create(pub: Partial<PubInfo>, credentials: Credentials) {
    return this.requests.create({...pub, credentials});
  }

  update(pubIds: Pick<PubInfo, "id" | "user_id">, credentials: Credentials, data: Object) {
    return this.requests.update({...pubIds, credentials, data});
  }

  remove(pubIds: Pick<PubInfo, "id" | "user_id">, credentials: Credentials) {
    return this.requests.remove({...pubIds, credentials});
  }
}

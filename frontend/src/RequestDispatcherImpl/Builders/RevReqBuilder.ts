import { Builder } from "../../modules/RequestDispatcher/Builder";
import { ReviewEndpoints } from "../../../../backend/src/server/Endpoints";

type Credentials = {
  username: string,
  password: string
}

type RevInfo = {
  user_id: string,
  publication_id: number,
  title: string,
  body: string
}

type RevIds = Pick<RevInfo, "publication_id" | "user_id">;

export class RevReqBuilder extends Builder<keyof typeof ReviewEndpoints> {
  constructor() {
    super();
    type keytype = keyof typeof ReviewEndpoints;
    for (let key in ReviewEndpoints) {
      this.build(key, ReviewEndpoints[key as keytype]);
    }
  }

  get() {
    return {
      id: (pubId: number, userId: string) => {
        return this.requests.getReview({}, pubId, userId);
      },
      ofUser: (userId: string) => {
        return this.requests.getReviewsOfUser({}, userId);
      },
      ofPublication: (pubId: string) => {
        return this.requests.getReviewsOfPublication({}, pubId);
      }
    }
  }

  create(review: RevInfo, credentials: Credentials) {
    return this.requests.create({...review, credentials});
  }

  update(reviewIds: RevIds, credentials: Credentials, data: Object) {
    return this.requests.update({...reviewIds, credentials, data});
  }

  remove(reviewIds: RevIds, credentials: Credentials) {
    return this.requests.remove({...reviewIds, credentials});
  }
}

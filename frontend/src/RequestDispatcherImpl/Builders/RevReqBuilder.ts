import { Builder } from "../../modules/RequestDispatcher/Builder";
import { ReviewEndpoints } from "../../../../backend/src/ServerImpl/Endpoints";

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

  create(review: RevInfo, token: string) {
    return this.requests.create({...review, token});
  }

  update(reviewIds: RevIds, token: string, data: Object) {
    return this.requests.update({...reviewIds, token, data});
  }

  remove(reviewIds: RevIds, token: string) {
    return this.requests.remove({...reviewIds, token});
  }
}

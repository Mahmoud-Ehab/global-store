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
        const request_name = "review_get";
        return this.requests.getReview({request_name}, pubId, userId);
      },
      ofUser: (userId: string) => {
        const request_name = "review_getOfUser";
        return this.requests.getReviewsOfUser({request_name}, userId);
      },
      ofPublication: (pubId: string) => {
        const request_name = "review_getOfPublication";
        return this.requests.getReviewsOfPublication({request_name}, pubId);
      }
    }
  }

  create(review: RevInfo, token: string) {
    const request_name = "review_create";
    return this.requests.create({request_name, ...review, token});
  }

  update(reviewIds: RevIds, token: string, data: Object) {
    const request_name = "review_update";
    return this.requests.update({request_name, ...reviewIds, token, data});
  }

  remove(reviewIds: RevIds, token: string) {
    const request_name = "review_delete";
    return this.requests.remove({request_name, ...reviewIds, token});
  }
}

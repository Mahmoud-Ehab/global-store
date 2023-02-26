import { Builder } from "../../modules/RequestDispatcher/Builder";
import { UserEndpoints } from "../../../../backend/src/server/Endpoints";

export class UserReqBuilder extends Builder<keyof typeof UserEndpoints> {
  constructor() {
    super();
    type keytype = keyof typeof UserEndpoints;
    for (let key in UserEndpoints) {
      this.build(key, UserEndpoints[key as keytype]);
    }
  }
}

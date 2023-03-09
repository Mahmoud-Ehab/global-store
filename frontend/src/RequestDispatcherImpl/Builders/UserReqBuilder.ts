import { Builder } from "../../modules/RequestDispatcher/Builder";
import { UserEndpoints } from "../../../../backend/src/ServerImpl/Endpoints";

type Credentials = {
  username: string,
  password: string
}

export class UserReqBuilder extends Builder<keyof typeof UserEndpoints> {
  constructor() {
    super();
    type keytype = keyof typeof UserEndpoints;
    for (let key in UserEndpoints) {
      this.build(key, UserEndpoints[key as keytype]);
    }
  }

  get() {
    return {
      id: (userId: string) => {
        return this.requests.getUser({}, userId);
      },
      limit: (limit: number) => {
        return this.requests.getUsersLimit({}, limit);
      }
    }
  }

  update(id: string, credentials: Credentials, data: Object) {
    return this.requests.update({id, credentials, data});
  }

  remove(id: string, credentials: Credentials) {
    return this.requests.remove({id, credentials});
  }

  login(credentials: Credentials) {
    return this.requests.login(credentials);
  }

  register(credentials: Credentials) {
    return this.requests.register(credentials);
  }
}

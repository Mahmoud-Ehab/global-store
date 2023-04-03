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
        const request_name = "user_getById";
        return this.requests.getUser({request_name}, userId);
      },
      limit: (limit: number) => {
        const request_name = "user_getLimit";
        return this.requests.getUsersLimit({request_name}, limit);
      }
    }
  }

  update(id: string, credentials: Credentials, data: Object) {
    const request_name = "user_update";
    return this.requests.update({request_name, id, credentials, data});
  }

  remove(id: string, credentials: Credentials) {
    const request_name = "user_delete";
    return this.requests.remove({request_name, id, credentials});
  }

  login(credentials: Credentials) {
    const request_name = "user_login";
    return this.requests.login({request_name, ...credentials});
  }

  register(credentials: Credentials) {
    const request_name = "user_register";
    return this.requests.register({request_name, ...credentials});
  }
}

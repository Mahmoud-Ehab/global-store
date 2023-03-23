import { DataController } from "../../_modules/Database/DataController";
import { User } from "../../_modules/Database/Storages";

type Credentials = {
  username: string,
  password: string
}

export class UsersController extends DataController<User> { 
  async auth(id: string, credentials: Credentials): Promise<boolean> {
    try {
      const query = this.queries.get(id);
      const res = await this.queryHandler.query(query);
      if (!res[0])
        return false;
      return this.authenticate(res[0], credentials);
    }
    catch (e) {
      throw e;
    }
  }

  async authToken(id: string, token: string): Promise<boolean> {
    try {
      const query = this.queries.get(id);
      const res = await this.queryHandler.query(query);
      if (!res[0])
        return false;
      return res[0].token === token;
    }
    catch (e) {
      throw e;
    }
  }

  async setToken(id: string, token: string): Promise<boolean> {
    try {
      const query = this.queries.get(id);
      const res = await this.queryHandler.query(query);
      if (!res[0])
        return false;
      const result = await this.update({token}, {id: res[0].id});
      return result !== null;
    }
    catch (e) {
      throw e;
    }
  }

  protected authenticate(data: User, credentials: Credentials) {
    for (const key in credentials) {
      if ((credentials as any)[key] !== (data as any)[key])
        return false;
    }
    return true;
  }

  protected parseData(data: User, all?: boolean): User {
    const user: User = !all ? {
      id: data.id,
      token: undefined,
      username: data.username,
      password: undefined,
      nickname: data.nickname,
      cr: data.cr,
      trw: data.trw,
    } : {...data}
    return super.parseData(user);
  }
}

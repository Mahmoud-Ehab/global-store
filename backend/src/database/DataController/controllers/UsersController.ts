import DataControllerImp from '../DataControllerImp'

export type User = {
  id: string,
  username: string,
  password: string,
  nickname: string, 
  cr: number,
  trw: number,
}

type Credentials = {
  username: string,
  password: string
}

class UsersController extends DataControllerImp<User> { 
  async auth(id: string, credentials: Credentials): Promise<boolean> {
    try {
      const query = this.queries.get(id);
      const res = await this.client.query(query);
      if (!res.rows[0])
        return false;
      return this.authenticate(res.rows[0], credentials);
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
      username: data.username,
      password: undefined,
      nickname: data.nickname,
      cr: data.cr,
      trw: data.trw,
    } : {...data}
    return super.parseData(user);
  }
}

export default UsersController;
import DataController from '../DataController'

type User = {
  id: string,
  username: string,
  password: string,
  nickname: string, 
  cr: number,
  trw: number,
}

class UsersController extends DataController<User> {  
  protected parseData(data: User): User {
    const user: User = {
      id: data.id,
      username: data.username,
      password: data.password,
      nickname: data.nickname,
      cr: data.cr,
      trw: data.trw,
    }    
    return user;
  }
}

export default UsersController;
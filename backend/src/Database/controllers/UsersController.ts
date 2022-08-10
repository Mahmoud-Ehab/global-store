import DataController from '../abstracts/DataController'
import Queries from '../Queries';
import User from '../types/User'

class UsersController extends DataController<User> {
  queries = new Queries('users');
  
  protected parseData(data: User): User {
    const user: User = {
      id: data.id,
      username: data.username,
      nickname: data.nickname,
      cr: data.cr,
      trw: data.trw
    }    
    return user;
  }
}

export default UsersController;
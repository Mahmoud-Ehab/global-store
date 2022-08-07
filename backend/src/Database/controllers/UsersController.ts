import { Client, types } from 'pg'
import DataControllerInterface from '../../DataDriver/interfaces/DataControllerInterface';
import User from '../../DataDriver/types/User'
import { getXById } from '../queries/get';

class UsersController implements DataControllerInterface<User> {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async get(id: number): Promise<User> {
    const query = getXById('users', id);
    const res = await this.client.query(query);
    const data = this.parseData(res.rows[0]);
    return data;
  }

  getAll(): User[] {
    throw new Error('Method not implemented.');
  }
  getLimit(limit: number): User[] {
    throw new Error('Method not implemented.');
  }
  getFiltered(data: Partial<User>): User[] {
    throw new Error('Method not implemented.');
  }
  insert(data: Partial<User>): boolean {
    throw new Error('Method not implemented.');
  }
  update(id: number, data: Partial<User>): boolean {
    throw new Error('Method not implemented.');
  }
  delete(id: number): boolean {
    throw new Error('Method not implemented.');
  }

  parseData(data: User): User {
    const user: User = {
      id: data.id,
      username: data.username,
      nickname: data.nickname,
      cr: data.cr,
      trw: data.trw
    };
    return user;
  }

}

export default UsersController;
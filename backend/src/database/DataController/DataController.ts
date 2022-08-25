import { Client, QueryResult } from 'pg'
import DataControllerInterface from './DataControllerInterface'
import QueriesInterface from '../Queries/QueriesInterface'


abstract class DataController<T> implements DataControllerInterface<T> {
  private client: Client;
  protected queries: QueriesInterface;

  constructor(client: Client, queries: QueriesInterface) {
    this.client = client;
    this.queries = queries;
  }

  async get(id: string): Promise<T> {
    try {
      const query = this.queries.getById(id);
      const res = await this.client.query(query);

      if (res.rows.length === 0)
        return {} as T;

      const data = this.parseData(res.rows[0]);
      return data;
    }
    catch (e) {
      throw e;
    }
  }

  async getAll(): Promise<T[]> {
    try {
      const query = this.queries.getAll();
      const res = await this.client.query(query);

      const data: Array<T> = [];
      res.rows.forEach(row => data.push(this.parseData(row)));
      return data;
    } 
    catch (e) {
      throw e;
    }
  }

  async getLimit(limit: number): Promise<T[]> {
    try {
      const query = this.queries.getLimit(limit);
      const res = await this.client.query(query);
      
      const data: Array<T> = [];
      res.rows.forEach(row => data.push(this.parseData(row)));
      return data;
    }
    catch (e) {
      throw e;
    }
  }

  async getFiltered(filterOptions: Partial<T>): Promise<T[]> {
    try {
      const query = this.queries.getFiltered(filterOptions);
      const res = await this.client.query(query);
      
      const data: Array<T> = [];
      res.rows.forEach(row => data.push(this.parseData(row)));
      return data;
    }
    catch (e) {
      throw e;
    }
  }

  async insert(data: Partial<T>): Promise<QueryResult> {
    try {
      const query = this.queries.insert(data);
      const res = await this.client.query(query);
      return res;
    }
    catch (e) {
      throw e;
    }
  }

  async update(id: number, data: Partial<T>): Promise<QueryResult> {
    try {
      const query = this.queries.update(id, data);
      const res = await this.client.query(query);
      return res;
    }
    catch (e) {
      throw e;
    }
  }
  
  async delete(id: number): Promise<QueryResult> {
    try {  
      const query = this.queries.delete(id);
      const res = await this.client.query(query);
      return res;
    }
    catch (e) {
      throw e;
    }
  }

  protected parseData(data: Object): T {
    return data as T;
  }
}

export default DataController;
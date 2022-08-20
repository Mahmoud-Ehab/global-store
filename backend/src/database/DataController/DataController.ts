import { Client, QueryResult } from 'pg'
import DataControllerInterface, { ErrorResponse } from './DataControllerInterface'
import QueriesInterface from '../Queries/QueriesInterface'


abstract class DataController<T> implements DataControllerInterface<T> {
  private client: Client;
  protected queries: QueriesInterface;

  constructor(client: Client, queries: QueriesInterface) {
    this.client = client;
    this.queries = queries;
  }

  async get(id: number): Promise<T | ErrorResponse> {
    try {
      const query = this.queries.getById(id);
      const res = await this.client.query(query);
      const data = this.parseData(res.rows[0]);
      return data;
    }
    catch (e) {
      return { error: e.message };
    }
  }

  async getAll(): Promise<T[] | ErrorResponse> {
    try {
      const query = this.queries.getAll();
      const res = await this.client.query(query);

      const data: Array<T> = [];
      res.rows.forEach(row => data.push(this.parseData(row)));
      return data;
    } 
    catch (e) {
      return { error: e.message };
    }
  }

  async getLimit(limit: number): Promise<T[] | ErrorResponse> {
    try {
      const query = this.queries.getLimit(limit);
      const res = await this.client.query(query);
      
      const data: Array<T> = [];
      res.rows.forEach(row => data.push(this.parseData(row)));
      return data;
    }
    catch (e) {
      return { error: e.message };
    }
  }

  async getFiltered(filterOptions: Partial<T>): Promise<T[] | ErrorResponse> {
    try {
      const query = this.queries.getFiltered(filterOptions);
      const res = await this.client.query(query);
      
      const data: Array<T> = [];
      res.rows.forEach(row => data.push(this.parseData(row)));
      return data;
    }
    catch (e) {
      return { error: e.message };
    }
  }

  async insert(data: Partial<T>): Promise<QueryResult | ErrorResponse> {
    try {
      const query = this.queries.insert(data);
      const res = await this.client.query(query);
      return res;
    }
    catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, data: Partial<T>): Promise<QueryResult | ErrorResponse> {
    try {
      const query = this.queries.update(id, data);
      const res = await this.client.query(query);
      return res;
    }
    catch (e) {
      return { error: e.message };
    }
  }
  
  async delete(id: number): Promise<QueryResult | ErrorResponse> {
    try {  
      const query = this.queries.delete(id);
      const res = await this.client.query(query);
      return res;
    }
    catch (e) {
      return { error: e.message };
    }
  }

  protected parseData(data: Object): T {
    return data as T;
  }
}

export default DataController;
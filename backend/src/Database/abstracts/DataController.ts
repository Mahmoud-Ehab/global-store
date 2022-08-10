import { Client, QueryResult } from 'pg'
import DataControllerInterface from '../interfaces/DataControllerInterface'
import QueriesInterface from '../interfaces/QueriesInterface'


abstract class DataController<T> implements DataControllerInterface<T> {
  private client: Client;
  protected queries: QueriesInterface;

  constructor(client: Client) {
    this.client = client;
  }

  async get(id: number): Promise<T> {
    const query = this.queries.getById(id);
    const res = await this.client.query(query);
    const data = this.parseData(res.rows[0]);
    return data;
  }

  async getAll(): Promise<T[]> {
    const query = this.queries.getAll();
    const res = await this.client.query(query);

    const data: Array<T> = [];
    res.rows.forEach(row => data.push(this.parseData(row)));
    return data;
  }

  async getLimit(limit: number): Promise<T[]> {
    const query = this.queries.getLimit(limit);
    const res = await this.client.query(query);
    
    const data: Array<T> = [];
    res.rows.forEach(row => data.push(this.parseData(row)));
    return data;
  }

  async getFiltered(filterOptions: Partial<T>): Promise<T[]> {
    const query = this.queries.getFiltered(filterOptions);
    const res = await this.client.query(query);
    
    const data: Array<T> = [];
    res.rows.forEach(row => data.push(this.parseData(row)));
    return data;
  }

  async insert(data: Partial<T>): Promise<QueryResult> {
    const query = this.queries.insert(data);
    const res = await this.client.query(query);
    return res;
  }

  async update(id: number, data: Partial<T>): Promise<QueryResult> {
    const query = this.queries.update(id, data);
    const res = await this.client.query(query);
    return res;
  }
  
  async delete(id: number): Promise<QueryResult> {
    const query = this.queries.delete(id);
    const res = await this.client.query(query);
    return res;
  }

  protected parseData(data: Object): T {
    return data as T;
  }
}

export default DataController;
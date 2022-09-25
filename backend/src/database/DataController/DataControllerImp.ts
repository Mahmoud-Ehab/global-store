import { Client, QueryResult } from 'pg'
import DataControllerInterface from './DataController'
import QueryGenerator from '../QueryGenerator/QueryGenerator'


abstract class DataController<T> implements DataControllerInterface<T> {
  protected client: Client;
  protected queries: QueryGenerator;

  constructor(client: Client, queries: QueryGenerator) {
    this.client = client;
    this.queries = queries;
  }

  async get(id: string | number): Promise<T> {
    try {
      const query = this.queries.get(id);
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

  async getLimitWithOffset(limit: number, offset: number): Promise<Array<T>> {
    try {
      const query = this.queries.getLimitWithOffset(limit, offset);
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
      const query = this.queries.getWhere(filterOptions);
      const res = await this.client.query(query);
      
      const data: Array<T> = [];
      res.rows.forEach(row => data.push(this.parseData(row)));
      return data;
    }
    catch (e) {
      throw e;
    }
  }

  async getJoin(join: { table: string; key1: string; key2: string; }, filter: Partial<T>): Promise<T[]> {
    try {
      const query = this.queries.getJoin(join, filter);
      const res = await this.client.query(query);
      
      const data: Array<T> = [];
      res.rows.forEach(row => data.push(row));
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

  async update(data: Partial<T>, filter: object): Promise<QueryResult> {
    try {
      const query = this.queries.update(data, filter);
      const res = await this.client.query(query);
      return res;
    }
    catch (e) {
      throw e;
    }
  }
  
  async delete(filter: object): Promise<QueryResult> {
    try {  
      const query = this.queries.delete(filter);
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
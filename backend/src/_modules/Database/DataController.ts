import { QueryHandler } from './Storage'
import { QueryGenerator } from './Storage/Query/QueryGenerator'

export abstract class DataController<T> {
  protected queryHandler: QueryHandler<T>;
  protected queries: QueryGenerator;

  constructor(queryHandler: QueryHandler<T>, queries: QueryGenerator) {
    this.queryHandler = queryHandler;
    this.queries = queries;
  }

  async get(id: string | number): Promise<T> {
    try {
      const query = this.queries.get(id);
      const res = await this.queryHandler.query(query);

      if (res.length === 0)
        return {} as T;

      const data = this.parseData(res[0]);
      return data;
    }
    catch (e) {
      throw e;
    }
  }

  async getAll(): Promise<T[]> {
    try {
      const query = this.queries.getAll();
      const res = await this.queryHandler.query(query);

      const data: Array<T> = [];
      res.forEach(row => data.push(this.parseData(row)));
      return data;
    } 
    catch (e) {
      throw e;
    }
  }

  async getLimit(limit: number): Promise<T[]> {
    try {
      const query = this.queries.getLimit(limit);
      const res = await this.queryHandler.query(query);
      
      const data: Array<T> = [];
      res.forEach(row => data.push(this.parseData(row)));
      return data;
    }
    catch (e) {
      throw e;
    }
  }

  async getLimitWithOffset(limit: number, offset: number): Promise<Array<T>> {
    try {
      const query = this.queries.getLimitWithOffset(limit, offset);
      const res = await this.queryHandler.query(query);
      
      const data: Array<T> = [];
      res.forEach(row => data.push(this.parseData(row)));
      return data;
    }
    catch (e) {
      throw e;
    }
  }

  async getFiltered(filterOptions: Partial<T>): Promise<T[]> {
    try {
      const query = this.queries.getWhere(filterOptions);
      const res = await this.queryHandler.query(query);
      
      const data: Array<T> = [];
      res.forEach(row => data.push(this.parseData(row)));
      return data;
    }
    catch (e) {
      throw e;
    }
  }

  async getJoin(join: { table: string; key1: string; key2: string; }, filter: Partial<T>): Promise<T[]> {
    try {
      const query = this.queries.getJoin(join, filter);
      const res = await this.queryHandler.query(query);
      
      const data: Array<T> = [];
      res.forEach(row => data.push(this.parseData(row, true)));
      return data;
    }
    catch (e) {
      throw e;
    }
  }

  async insert(data: Partial<T>): Promise<void> {
    try {
      const query = this.queries.insert(data);
      const res = await this.queryHandler.query(query);
    }
    catch (e) {
      throw e;
    }
  }

  async update(data: Partial<T>, filter: Partial<T>): Promise<void> {
    try {
      const query = this.queries.update(data, filter);
      await this.queryHandler.query(query);
    }
    catch (e) {
      throw e;
    }
  }
  
  async delete(filter: object): Promise<void> {
    try {  
      const query = this.queries.delete(filter);
      await this.queryHandler.query(query);
    }
    catch (e) {
      throw e;
    }
  }

  protected parseData(data: any, all?: boolean): T {
    delete data.password;
    return data as T;
  }
}

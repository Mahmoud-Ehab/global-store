import { QueryResult } from "pg";

interface DataController<T> {
  get(id: string | number): Promise<T>;
  getAll(): Promise<Array<T>>;
  getLimit(limit: number): Promise<Array<T>>;
  getLimitWithOffset(limit: number, offset: number): Promise<Array<T>>;
  getFiltered(filter: Partial<T>): Promise<Array<T>>;
  getJoin(join: {
    table: string,
    key1: string,
    key2: string
  }, filter: Partial<T>): Promise<Array<T>>;

  insert(data: Partial<T>): Promise<object>;
  update(data: Partial<T>, filter: Partial<T>): Promise<QueryResult>;
  delete(filter: object): Promise<QueryResult>;
}

export default DataController;
import { QueryResult } from "pg";

interface DataController<T> {
  get(id: number): Promise<T>;
  getAll(): Promise<Array<T>>;
  getLimit(limit: number): Promise<Array<T>>;
  getFiltered(data: Partial<T>): Promise<Array<T>>;

  insert(data: Partial<T>): Promise<QueryResult>;
  update(id: number, data: Partial<T>): Promise<QueryResult>;
  delete(id: number): Promise<QueryResult>;
}

export default DataController;
import { QueryResult } from "pg";

interface DataController<T> {
  get(id: string | number): Promise<T>;
  getAll(): Promise<Array<T>>;
  getLimit(limit: number): Promise<Array<T>>;
  getFiltered(data: Partial<T>): Promise<Array<T>>;

  insert(data: Partial<T>): Promise<object>;
  update(id: string | number, data: Partial<T>): Promise<QueryResult>;
  delete(id: string | number): Promise<QueryResult>;
}

export default DataController;
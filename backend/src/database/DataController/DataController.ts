import { QueryResult } from "pg";

interface DataController<T> {
  get(id: string | number): Promise<T>;
  getAll(): Promise<Array<T>>;
  getLimit(limit: number): Promise<Array<T>>;
  getFiltered(data: Partial<T>): Promise<Array<T>>;

  insert(data: Partial<T>): Promise<object>;
  update(data: Partial<T>, filter: object): Promise<QueryResult>;
  delete(filter: object): Promise<QueryResult>;
}

export default DataController;
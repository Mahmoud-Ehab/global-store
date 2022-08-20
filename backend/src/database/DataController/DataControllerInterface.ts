import { QueryResult } from "pg";

export type ErrorResponse = {
  error: string;
}

interface DataController<T> {
  get(id: number): Promise<T | ErrorResponse>;
  getAll(): Promise<Array<T> | ErrorResponse>;
  getLimit(limit: number): Promise<Array<T> | ErrorResponse>;
  getFiltered(data: Partial<T>): Promise<Array<T> | ErrorResponse>;

  insert(data: Partial<T>): Promise<QueryResult | ErrorResponse>;
  update(id: number, data: Partial<T>): Promise<QueryResult | ErrorResponse>;
  delete(id: number): Promise<QueryResult | ErrorResponse>;
}

export default DataController;
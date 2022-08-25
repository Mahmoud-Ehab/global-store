import { QueryConfig } from "pg";

interface Queries {
  getAll(): QueryConfig;
  getById(id: string): QueryConfig;
  getLimit(limit: number): QueryConfig;
  getFiltered(filter: Object): QueryConfig;
  getRegEx(filter: Object): QueryConfig;

  insert(data: Object): QueryConfig;
  update(id: number, data: Object): QueryConfig;
  delete(id: number): QueryConfig;
}

export default Queries
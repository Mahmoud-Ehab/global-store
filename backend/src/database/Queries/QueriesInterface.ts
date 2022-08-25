import { QueryConfig } from "pg";

interface Queries {
  getAll(): QueryConfig;
  getById(id: string | number): QueryConfig;
  getLimit(limit: number): QueryConfig;
  getFiltered(filter: Object): QueryConfig;
  getRegEx(filter: Object): QueryConfig;

  insert(data: Object): QueryConfig;
  update(id: string | number, data: Object): QueryConfig;
  delete(id: string | number): QueryConfig;
}

export default Queries
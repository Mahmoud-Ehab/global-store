import { QueryConfig } from "pg";

interface Queries {
  get(filter: Object): QueryConfig;
  getAll(): QueryConfig;
  getLimit(limit: number): QueryConfig;
  getLimitWithOffset(limit: number, offset: number): QueryConfig<any[]>;
  getRegEx(filter: Object): QueryConfig;

  insert(data: Object): QueryConfig;
  update(data: Object, filter: Object): QueryConfig;
  delete(filter: Object): QueryConfig;
}

export default Queries
import { QueryConfig } from "pg";

interface Queries {
  get(id: any): QueryConfig;
  getWhere(filter: object): QueryConfig;
  getAll(): QueryConfig;
  getLimit(limit: number): QueryConfig;
  getLimitWithOffset(limit: number, offset: number): QueryConfig<any[]>;
  getRegEx(filter: Object): QueryConfig;

  insert(data: Object): QueryConfig;
  update(data: Object, filter: Object): QueryConfig;
  delete(filter: Object): QueryConfig;
}

export default Queries
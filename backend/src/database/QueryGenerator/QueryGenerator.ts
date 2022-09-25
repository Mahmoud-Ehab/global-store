import { QueryConfig } from "pg";

interface Queries {
  get(id: any): QueryConfig;
  getWhere(filter: object): QueryConfig;
  getAll(): QueryConfig;
  getLimit(limit: number): QueryConfig;
  getLimitWithOffset(limit: number, offset: number): QueryConfig<any[]>;
  getRegEx(filter: Object): QueryConfig;
  getJoin(join: {
    table: string,
    key1: string,
    key2: string
  }, filter: object): QueryConfig;

  insert(data: Object): QueryConfig;
  update(data: Object, filter: Object): QueryConfig;
  delete(filter: Object): QueryConfig;
}

export default Queries
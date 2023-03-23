import { QueryConfig } from "./QueryConfig";
import { QueryResult } from "./QueryResult";

export interface QueryHandler<T> {
  query: (config: QueryConfig) => Promise<QueryResult<T>>
}

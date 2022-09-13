export interface QueriesStrategy<T> {
  getById: (id: string | number) => () => Promise<T>;
  getFilteredList: (filter: Partial<T>) => () => Promise<Array<T>>;
  getLimit: (limit: number) => () => Promise<Array<T>>;
  
  insert: (data: Partial<T>) => () => Promise<any>;
  update: (data: Partial<T>, filter: Partial<T>) => () => Promise<any>;
  delete: (filter: Partial<T>) => () => Promise<any>;

  authUser: (credentials: any) => () => Promise<void>;
  ifNotExists: (i?: number) => () => Promise<void>;
  ifExists: (i?: number) => () => Promise<void>;

  send: (res: any, i?: number) => () => Promise<void>;
}

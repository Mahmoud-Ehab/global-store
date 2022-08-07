interface DataController<T> {
  get(id: number): Promise<T>;
  getAll(): Array<T>;
  getLimit(limit: number): Array<T>;
  getFiltered(data: Partial<T>): Array<T>;
  insert(data: Partial<T>): boolean;
  update(id: number, data: Partial<T>): boolean;
  delete(id: number): boolean;
  parseData(data: Object): T;
}

export default DataController;
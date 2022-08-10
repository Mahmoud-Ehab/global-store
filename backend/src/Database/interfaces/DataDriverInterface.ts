interface DataDriver {
  initClient(): void;
  endClient(): void;

  query(func: Function): void;
  queries(list: Array<Function>): void;
  execute(): Promise<boolean | Error>;
}

export default DataDriver;
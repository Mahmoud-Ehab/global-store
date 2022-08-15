interface DataDriver {
  get users(): Object;
  get publications(): Object;
  get reviews(): Object;
  connectClient(): void;
  endClient(): void;
  query(func: Function): void;
  execute(): Promise<boolean | Error>;
}

export default DataDriver;
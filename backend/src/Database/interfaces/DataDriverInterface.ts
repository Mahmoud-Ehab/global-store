interface DataDriver {
  connectClient(): void;
  endClient(): void;
  query(func: Function): void;
  execute(): Promise<boolean | Error>;
}

export default DataDriver;
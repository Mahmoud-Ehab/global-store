import { Client, ClientConfig } from "pg";
import { QueryConfig, QueryHandler, QueryResult } from "../_modules/Database/Storage";

export class PostgresQueryHandler<T> implements QueryHandler<T> {
  private client: Client;

  constructor(config: ClientConfig) {
    this.client = new Client(config);
  }

  async query(config: QueryConfig): Promise<QueryResult<T>> {
    const postgresQueryConfig = {
      name: config.name,
      text: config.command,
      values: config.values
    }
    const res = await this.client.query(postgresQueryConfig);
    return res.rows;
  }

  async connect() {
    this.client.connect();
  }

  async end() {
    this.client.end();
  }
}
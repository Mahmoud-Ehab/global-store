import { QueryConfig } from "../_modules/Database/Storages";
import { QueryGenerator } from "../_modules/Database/Storages/Query/QueryGenerator";

export class PostgresQueryGenerator implements QueryGenerator {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  get(id: any): QueryConfig { 
    const command = `
      SELECT * FROM ${this.tableName} 
      WHERE id = $1
    `
    const values = [id]
  
    return ({
      name: `${this.tableName}-get-id`,
      command,
      values,
    });
  }

  getWhere(filter: Object): QueryConfig { 
    const filterKeys = Object.keys(filter);
    const command = `
      SELECT * FROM ${this.tableName} 
      WHERE ${filterKeys.map((key,i) => `${key}=$${i+1}`).join(' AND ')}
    `
    const values = [...Object.values(filter)]
  
    return ({
      name: `${this.tableName}-get-where`,
      command,
      values,
    });
  }

  getAll(): QueryConfig {
    return ({
      name: `${this.tableName}-get-all-rows`,
      command: `SELECT * FROM ${this.tableName}`,
    });
  }

  getLimit(limit: number): QueryConfig {
    return ({
      name: `${this.tableName}-get-limit`,
      command: `SELECT * FROM ${this.tableName} LIMIT $1`,
      values: [limit]
    });
  }

  getLimitWithOffset(limit: number, offset: number): QueryConfig {
    return ({
      name: `${this.tableName}-get-limit-with-offset`,
      command: `SELECT * FROM ${this.tableName} LIMIT $1 OFFSET $2`,
      values: [limit, offset]
    });
  } 

  getRegEx(filter: Object): QueryConfig {
    const filterKeys = Object.keys(filter);
    const command = `
      SELECT * FROM ${this.tableName} 
      WHERE ${filterKeys.map((key,i) => `${key}=$${i+1}`).join(' AND ')}
    `
    const values = [...Object.values(filter)];
  
    return ({
      name: `${this.tableName}-get-filtered-data-with-regex`,
      command,
      values,
    });
  }

  getJoin(join: {
    table: string,
    key1: string,
    key2: string
  }, filter: Object) {
    const filterKeys = Object.keys(filter);
    const command = `
      SELECT * FROM ${this.tableName} 
      JOIN ${join.table} ON ${join.key1} = ${join.key2}
      WHERE ${filterKeys.map((key,i) => `${key}=$${i+1}`).join(' AND ')}
    `
    const values = [...Object.values(filter)]
  
    return ({
      name: `${this.tableName}-get-join`,
      command,
      values,
    });
  }

  insert(data: Object): QueryConfig {
    const command = `
      INSERT INTO 
      ${this.tableName}(${Object.keys(data).join()})
      VALUES(${Object.values(data).map((_, i) => `$${i+1}`).join()})
    `
    const values = [...Object.values(data)];
    
    return ({
      name: `${this.tableName}-insert-data`,
      command,
      values,
    });
  }

  update(data: Object, filter: object): QueryConfig {
    const whereIndex = Object.keys(data).length + 1;
    const dataKeys = Object.keys(data);
    const filterKeys = Object.keys(filter);

    const command = 
    `
      UPDATE ${this.tableName} 
      SET ${dataKeys.map((key, i) => `${key}=$${i+1}`).join()}
      WHERE ${filterKeys.map((key, i) => `${key}=$${whereIndex + i}`).join(' AND ')}
    `

    const values = [
      ...Object.values(data), 
      ...Object.values(filter)
    ];
    
    return ({
      name: `${this.tableName}-update-data`,
      command,
      values,
    });
  }

  delete(filter: object): QueryConfig {
    const filterKeys = Object.keys(filter);
    const command = `
      DELETE FROM ${this.tableName} 
      WHERE ${filterKeys.map((key,i) => `${key}=$${i+1}`).join(' AND ')}
    `
    const values = [...Object.values(filter)]
    
    return ({
      name: `${this.tableName}-delete-data`,
      command,
      values
    });
  }
}

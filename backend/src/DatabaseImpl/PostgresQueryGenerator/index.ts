import { QueryConfig } from "pg";
import { QueryGeneratorInterface } from "../../_modules/Database/QueryGeneratorInterface";

export class PostgresQueryGenerator implements QueryGeneratorInterface {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  get(id: any): QueryConfig<any[]> { 
    const text = `
      SELECT * FROM ${this.tableName} 
      WHERE id = $1
    `
    const values = [id]
  
    return ({
      name: `${this.tableName}-get-id`,
      text,
      values,
    });
  }

  getWhere(filter: Object): QueryConfig<any[]> { 
    const filterKeys = Object.keys(filter);
    const text = `
      SELECT * FROM ${this.tableName} 
      WHERE ${filterKeys.map((key,i) => `${key}=$${i+1}`).join(' AND ')}
    `
    const values = [...Object.values(filter)]
  
    return ({
      name: `${this.tableName}-get-where`,
      text,
      values,
    });
  }

  getAll(): QueryConfig<any[]> {
    return ({
      name: `${this.tableName}-get-all-rows`,
      text: `SELECT * FROM ${this.tableName}`,
    });
  }

  getLimit(limit: number): QueryConfig<any[]> {
    return ({
      name: `${this.tableName}-get-limit`,
      text: `SELECT * FROM ${this.tableName} LIMIT $1`,
      values: [limit]
    });
  }

  getLimitWithOffset(limit: number, offset: number): QueryConfig<any[]> {
    return ({
      name: `${this.tableName}-get-limit-with-offset`,
      text: `SELECT * FROM ${this.tableName} LIMIT $1 OFFSET $2`,
      values: [limit, offset]
    });
  } 

  getRegEx(filter: Object): QueryConfig<any[]> {
    const filterKeys = Object.keys(filter);
    const text = `
      SELECT * FROM ${this.tableName} 
      WHERE ${filterKeys.map((key,i) => `${key}=$${i+1}`).join(' AND ')}
    `
    const values = [...Object.values(filter)];
  
    return ({
      name: `${this.tableName}-get-filtered-data-with-regex`,
      text,
      values,
    });
  }

  getJoin(join: {
    table: string,
    key1: string,
    key2: string
  }, filter: Object) {
    const filterKeys = Object.keys(filter);
    const text = `
      SELECT * FROM ${this.tableName} 
      JOIN ${join.table} ON ${join.key1} = ${join.key2}
      WHERE ${filterKeys.map((key,i) => `${key}=$${i+1}`).join(' AND ')}
    `
    const values = [...Object.values(filter)]
  
    return ({
      name: `${this.tableName}-get-join`,
      text,
      values,
    });
  }

  insert(data: Object): QueryConfig<any[]> {
    const text = `
      INSERT INTO 
      ${this.tableName}(${Object.keys(data).join()})
      VALUES(${Object.values(data).map((_, i) => `$${i+1}`).join()})
    `
    const values = [...Object.values(data)];
    
    return ({
      name: `${this.tableName}-insert-data`,
      text,
      values,
    });
  }

  update(data: Object, filter: object): QueryConfig<any[]> {
    const whereIndex = Object.keys(data).length + 1;
    const dataKeys = Object.keys(data);
    const filterKeys = Object.keys(filter);

    const text = 
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
      text,
      values,
    });
  }

  delete(filter: object): QueryConfig<any[]> {
    const filterKeys = Object.keys(filter);
    const text = `
      DELETE FROM ${this.tableName} 
      WHERE ${filterKeys.map((key,i) => `${key}=$${i+1}`).join(' AND ')}
    `
    const values = [...Object.values(filter)]
    
    return ({
      name: `${this.tableName}-delete-data`,
      text,
      values
    });
  }
}

import { QueryConfig } from "pg";
import QueriesInterface from "./QueryGenerator";

class Queries implements QueriesInterface {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  get(filter: Object): QueryConfig<any[]> { 
    const filterKeys = Object.keys(filter);
    const text = `
      SELECT * FROM ${this.tableName} 
      WHERE ${filterKeys.map((key,i) => `${key}=$${i+1}`).join(' AND ')}
    `
    const values = [...Object.values(filter)]
  
    return ({
      name: `${this.tableName}-get-data`,
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
      name: `${this.tableName}-get-all-with-limit`,
      text: `SELECT * FROM ${this.tableName} LIMIT $1`,
      values: [limit]
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

export default Queries;
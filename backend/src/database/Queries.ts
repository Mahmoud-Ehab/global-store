import { QueryConfig } from "pg";
import QueriesInterface from "./interfaces/QueriesInterface";

class Queries implements QueriesInterface {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  getAll(): QueryConfig<any[]> {
    return ({
      name: 'get-all-rows',
      text: `SELECT * FROM ${this.tableName}`,
    });
  }
  
  getById(id: number): QueryConfig<any[]> {
    return ({
      name: 'get-row-by-id',
      text: `SELECT * FROM ${this.tableName} WHERE id = $1`,
      values: [id],
    });
  }

  getLimit(limit: number): QueryConfig<any[]> {
    return ({
      name: 'get-all-with-limit',
      text: `SELECT * FROM ${this.tableName} LIMIT $1`,
      values: [limit]
    });
  }

  getFiltered(filter: Object): QueryConfig<any[]> { 
    let text = `SELECT * FROM ${this.tableName} WHERE`;
    const values: Array<any> = [];
  
    Object.keys(filter).forEach((key, i) => {
      text += ` ${key}=$${i+1}`;
    });
    values.push(...Object.values(filter));
  
    return ({
      name: 'get-filtered-data',
      text,
      values,
    });
  }

  getRegEx(filter: Object): QueryConfig<any[]> { 
    let text = `SELECT * FROM ${this.tableName} WHERE`;
    const values: Array<any> = [];
  
    Object.keys(filter).forEach((key, i) => {
      text += ` ${key} LIKE $${i+1}`;
    });
    values.push(...Object.values(filter));
  
    return ({
      name: 'get-filtered-data-with-regex',
      text,
      values,
    });
  }

  insert(data: Object): QueryConfig<any[]> {
    const text = `INSERT INTO 
    ${this.tableName}(${Object.keys(data).join()})
    VALUES(${Object.values(data).map((val, i) => `$${i+1}`).join()})`;

    const values = [...Object.values(data)];
    
    return ({
      name: 'insert-data',
      text,
      values,
    });
  }

  update(id: number, data: Object): QueryConfig<any[]> {
    const text = `UPDATE ${this.tableName} 
    SET ${Object.values(data).map((val, i) => `$${i+1}`).join()}
    WHERE id=$${Object.values(data).length + 1}`;

    const values = [...Object.values(data), id];
    
    return ({
      name: 'update-data',
      text,
      values,
    });
  }

  delete(id: number): QueryConfig<any[]> {
    return ({
      name: 'delete-data',
      text: `DELETE FROM ${this.tableName} WHERE id=$1`,
      values: [id],
    });
  }
}

export default Queries;
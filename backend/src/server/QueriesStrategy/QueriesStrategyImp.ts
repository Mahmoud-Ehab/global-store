import DataController from "../../database/DataController/DataController";
import QueryManager, { Controllers } from "../../database/QueryManager/QueryManager";
import { 
  AlreadyExists,
  AuthenticationFailed,
  Done,
  InteranlError,
  NotFound 
} from "../Responses";
import { QueriesStrategy } from "./QueriesStrategy";


export abstract class QueriesStrategyImp<T> implements QueriesStrategy<T> {
  protected qm: QueryManager;
  protected type: keyof Controllers;

  constructor(qm: QueryManager, type: keyof Controllers) {
    this.qm = qm;
    this.type = type;
  }

  getById(id: string | number){ 
    return async () => {
      const controller = this.qm.getController(this.type) as any;
      return await controller.get(id)
    }
  }
  getFilteredList(filter: Partial<T>) {
    return async () => {
      const controller = this.qm.getController(this.type) as any;
      return await controller.getFiltered(filter);
    }
  }
  getLimit(limit: number) {
    return async () => {
      const controller = this.qm.getController(this.type) as any;
      return await controller.getLimit(limit)
    }
  }
  getLimitWithOffset(limit: number, offset: number) {
    return async () => {
      const controller = this.qm.getController(this.type) as any;
      return await controller.getLimitWithOffset(limit, offset);
    }
  }

  insert(data: Partial<T>) {
    return async () => {
      const controller = this.qm.getController(this.type) as any;
      return await controller.insert(data)
    }
  }
  update(data: Partial<T>, filter: Partial<T>) {
    return async () => {
      const controller = this.qm.getController(this.type) as any;
      return await controller.update(data, filter)
    }
  }
  delete(filter: Partial<T>) {
    return async () => {
      const controller = this.qm.getController(this.type) as any;
      return await controller.delete(filter)
    }
  }

  ifNotExists(i?: number) {
    return (async function() {
      let k = -1; while (!this.carrier[++k]);
      if (Object.keys(this.carrier[i || k]).length) {
        throw AlreadyExists;
      }
    }).bind(this.qm)
  }
  ifExists(i?: number) {
    return (async function() {
      let k = -1; while (!this.carrier[++k]);
      if (!Object.keys(this.carrier[i || k]).length) {
        throw NotFound;
      }
    }).bind(this.qm)
  }

  builder() {
    return {
      getListItem: (i: number) => (async function() {
        let k = -1; while (!this.carrier[++k]);
        if (this.carrier[k][i])
          return this.carrier[k][i]
        else
          return this.carrier[k]
      }).bind(this.qm),

      define: (key: string, i: number) => (async function() {
        let k = -1; while (!this.carrier[++k]);
        let obj: any = {...this.carrier[k]};
        if (key)
          obj[key] = this.carrier[i || k];
        else
          obj = {
            ...obj,
            ...this.carrier[i || k]
          }
        return obj;
      }).bind(this.qm)
    }
  }
  
  send(callback: Function, i?: number) {
    return (async function() {
      let k = -1; while (!this.carrier[++k]);
      callback(Done({data: this.carrier[i || k]}))
    }).bind(this.qm)
  }
}
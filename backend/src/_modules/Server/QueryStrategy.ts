import { Controllers, QueryManager } from "../Database/QueryManager";
import { AlreadyExists, Done, NotFound } from "./Responses";

export abstract class QueryStrategy<T> {
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
      if (Object.keys(this.carrier.get(i)).length) {
        throw AlreadyExists;
      }
    }).bind(this.qm)
  }
  ifExists(i?: number) {
    return (async function() {
      if (!Object.keys(this.carrier.get(i)).length) {
        throw NotFound;
      }
    }).bind(this.qm)
  }

  builder() {
    return {
      getListItem: (i: number) => (async function() {
        const listItem = this.carrier.get();
        if (listItem[i])
          return listItem[i]
        else
          return listItem
      }).bind(this.qm),

      define: (key: string, i: number) => (async function() {
        const objItem = this.carrier.get();
        let obj: any = {...objItem};
        if (key)
          obj[key] = this.carrier.get(i);
        else
          obj = {
            ...obj,
            ...this.carrier.get(i)
          }
        return obj;
      }).bind(this.qm)
    }
  }
  
  send(callback: Function, i?: number) {
    return (async function() {
      callback(Done({data: this.carrier.get(i)}));
    }).bind(this.qm)
  }
}

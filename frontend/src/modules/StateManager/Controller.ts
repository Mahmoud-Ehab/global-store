import { Entity } from "./Entity";

type ControllerEntity = Entity<any, any, any>;

export abstract class Controller<E extends ControllerEntity> {
  protected entities: Array<E>;

  constructor(entities: Array<E>) {
    this.entities = entities;
  }

  getEntity(key: E["key"]): E {
    const found = this.entities.find((entity) => entity.key = key)
    return found;
  }

  getValue(key: E["key"]): E["value"] {
    return this.getEntity(key)?.value;
  }

  getCache(key: E["key"]): E["cache"] {
    return this.getEntity(key)?.cache;
  }

  update(key: E["key"], newValue: E["value"]): boolean {
    const prev = this.getValue(key);
    if (!prev)
      return false;

    for (let k in prev) {
      prev[k] = newValue[k];
    }
    return true;
  }

  remove(key: E["key"]): boolean {
    const prevLen = this.entities.length;
    this.entities = this.entities.filter((entity) => entity.key != key);
    return prevLen != this.entities.length;
  }
}
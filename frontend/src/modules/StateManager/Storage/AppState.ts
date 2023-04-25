import { Controller } from "./Controller"
import { Entity } from "./Entity";

type AppStateEntity = Entity<string, any, any>;

type Callback = {
  id: number;
  func: Function;
}

export abstract class AppState<E extends AppStateEntity> {
  protected entities: Array<E> = [];
  protected controller: Controller<E>;

  private callbacks: Array<Callback> = [];
  private cbCounter = 0;

  addEntity(key: E["key"], value: E["value"]) {
    for (let entity of this.entities) {
      if (entity.key === key) {
        console.error("Couldn't add entity: an entity with the same key already exists.");
        return;
      }
    }
    const cache = this.generateCache(value)
    const newEntity = {
      key,
      value,
      cache
    }
    this.entities.push(newEntity as E);
    this.callbacks.forEach(callback => callback.func());
  }

  subscribe(callbackFunc: Function): number {
    const callback = {
      id: this.cbCounter++,
      func: callbackFunc
    }
    this.callbacks.push(callback)
    return callback.id;
  }

  unsubscribe(id: number) {
    this.callbacks = this.callbacks.filter(callback => callback.id != id);
  }

  get(key: E["key"]) {
    return this.controller.getValue(key);
  }

  update(key: E["key"], value: Partial<E["value"]>) {
    if (!this.needsUpdate(key, value))
      return false;

    const updated = this.controller.update(key, value);
    if (updated)
      this.callbacks.forEach(callback => callback.func());
    return updated;
  }

  remove(key: E["key"]) {
    const removed = this.controller.remove(key);
    if (removed) {
      this.entities = removed;
      this.callbacks.forEach(callback => callback.func());
    }
    return removed !== null;
  }

  toObject() {
    const obj = Object.create({});

    for (let entity of this.entities)
      obj[entity.key] = this.controller.getObject(entity.key);

    return obj;
  }

  isEqual(newState: typeof this) {
    if (this === newState)
      return true;

    if (this.entities.length !== newState.entities.length)
      return false;

    for (let entity of this.entities) {
      const newValue = newState.get(entity.key);
      if (!newValue)
        return false;
      if (newValue.isEqual)
        return newValue.isEqual(entity.value);
      else
        return this.needsUpdate(entity.key, newValue);
    }
    
    return true;
  }

  protected needsUpdate(key: E["key"], newValue: E["value"]): boolean {
    const cache = this.controller.getCache(key);
    if (!cache) {
      console.error("Couldn't find key");
      return false;
    }

    for (let k in cache) {
      if (cache[k] !== newValue[k])
        return true;
    }
    return false;
  }

  protected generateCache(value: E["value"]): E["cache"] {
    // this method shall be implemented by concrete objects
    throw new Error("Method not implemented.");
  }
}
import { AppState, Controller, Entity } from ".";

type AnyEntity = Entity<any, any, any>;

export class SingleState<E extends AnyEntity> extends AppState<E> {
  constructor(info: E["value"]) {
    super();

    class SingleController extends Controller<E> {}
    this.controller = new SingleController(this.entities);

    this.addEntity("info", info);
    this.addEntity = null;
  }

  get() {
    return this.controller.getValue("info");
  }

  update(value: Partial<E["value"]>) {
    return super.update("info", value);
  }

  remove() {
    return super.remove("info");
  }

  toObject() {
    const obj = super.toObject();
    return this.flatObj(obj);
  }

  private flatObj(obj: object) {
    let flattedObj = {};

    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key]) {
        if (key === 'info')
          flattedObj = {
            ...flattedObj, 
            ...this.flatObj(obj[key])
          }
        else
          flattedObj[key] = this.flatObj(obj[key]);
      }
      else {
        flattedObj[key] = obj[key];
      }
    }

    return flattedObj;
  }

  protected generateCache(value: E["value"]): E["cache"] {
    return {...value};
  }
}

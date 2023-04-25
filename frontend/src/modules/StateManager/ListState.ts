import { AppState, Controller, Entity } from ".";

type AnyEntity = Entity<any, any, any>;

export class ListState<E extends AnyEntity> extends AppState<E> {
  constructor() {
    super();
    class ListController extends Controller<E> {}
    this.controller = new ListController(this.entities);
  }
  protected needsUpdate(key: E["key"], newValue: E["value"]): boolean {
    const curValue = this.controller.getValue(key);
    return !curValue.isEqual(newValue);
  }
  protected generateCache(_value: E["value"]): E["cache"] {
    return {};
  }
}

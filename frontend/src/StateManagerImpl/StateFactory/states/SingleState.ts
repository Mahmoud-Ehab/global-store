import { AppState, Controller, Entity } from "../../../modules/StateManager";

type AnyEntity = Entity<any, any, any>;

export class SingleState<E extends AnyEntity> extends AppState<E> {
  constructor(info: E["value"]) {
    super();

    class SingleController extends Controller<E> {}
    this.controller = new SingleController(this.entities);

    this.addEntity("info", info);
    this.addEntity = null;
  }
  protected generateCache(value: E["value"]): E["cache"] {
    return {...value};
  }
}

import { AppState, Controller, Entity } from "../../modules/StateManager";

export class StateFactory<S extends {}> {
  create(): [
    ReturnType<typeof this.createSingleState>, 
    ReturnType<typeof this.createListState>
  ] {
    return [this.createSingleState(), this.createListState()];
  }
  
  createSingleState() {
    type E = Entity<"info", S, Partial<S>>;

    class SingleController extends Controller<E> {}
    
    class SingleState extends AppState<E> {
      constructor(info: E["value"]) {
        super();
        this.controller = new SingleController(this.entities);
        this.addEntity("info", info);
        this.addEntity = null;
      }
      protected generateCache(value: E["value"]): E["cache"] {
        return {...value};
      }
    }
    return SingleState;
  }
  
  createListState() {
    const UserState = this.createSingleState();
    if (UserState instanceof AppState)
      type E = Entity<string, typeof UserState, {}>;

    class ListController extends Controller<E> {}

    class ListState extends AppState<E> {
      constructor() {
        super();
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
    return ListState;
  }
}
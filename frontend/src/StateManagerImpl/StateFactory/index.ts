import { Entity } from "../../modules/StateManager";
import { ListState } from "./states/ListState";
import { SingleState } from "./states/SingleState";

export class StateFactory<S extends {}> {
  create(): [
    ReturnType<typeof this.createSingleState>, 
    ReturnType<typeof this.createListState>
  ] {
    return [this.createSingleState(), this.createListState()];
  }
  
  createSingleState() {
    type SingleEntity = Entity<"info", S, Partial<S>>;
    return SingleState<SingleEntity>;
  }
  
  createListState() {
    const UserState = this.createSingleState();
    type E = Entity<string, typeof UserState, {}>;
    return ListState<E>;
  }
}

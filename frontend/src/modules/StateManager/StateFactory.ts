import { Entity } from ".";
import { ListState } from "./ListState";
import { SingleState } from "./SingleState";

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
    const SingleState = this.createSingleState();
    type E = Entity<string, typeof SingleState, {}>;
    return ListState<E>;
  }
}

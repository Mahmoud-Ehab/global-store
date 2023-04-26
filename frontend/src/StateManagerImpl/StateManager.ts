import { Entity, AppState } from "../modules/StateManager"
import { ListState } from "../modules/StateManager/ListState";

// substitutes to Enitity<...> for more readability.
type AnyEntity = Entity<any, any, any>;
type RootEntity = Entity<string, AppState<AnyEntity>, {}>;

export const StateManager = new ListState<RootEntity>();

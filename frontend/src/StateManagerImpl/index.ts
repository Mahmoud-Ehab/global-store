import { Entity, Controller, AppState } from "../modules/StateManager"
import * as Structures from "./Structures";
import { StateFactory } from "./StateFactory";


/* 
  Create a RootState with "StateManager" as its name, 
  and export it to the user.
*/

// substitutes to Enitity<...> for more readability.
type AnyEntity = Entity<any, any, any>;
type RootEntity = Entity<string, AppState<AnyEntity>, {}>;

class RootState extends AppState<RootEntity> {
  constructor() {
		super();
    class RootController extends Controller<RootEntity> {}
		this.controller = new RootController(this.entities);
	}

  protected needsUpdate(key: RootEntity["key"], newValue: RootEntity["value"]): boolean {
    const value = this.controller.getValue(key);
    if (typeof value === typeof newValue)
      return !value.isEqual(newValue);
  }

  protected generateCache(value: RootEntity["value"]): RootEntity["cache"] {
    return {};
  }
}
export const StateManager = new RootState();


/*
  Create the reuseable states that the client will need and use
  frequently in the StateManager.
*/

export const [User, UserList] = new StateFactory<Structures.User>().create();

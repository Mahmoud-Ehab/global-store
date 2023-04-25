import { Entity, Controller, AppState } from "../modules/StateManager"

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

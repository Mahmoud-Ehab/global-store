import { Entity, Controller, AppState } from "../modules/StateManager"

type AnyEntity = Entity<string, any, any>;

type RootEntity = Entity<string, AppState<AnyEntity>, {}>;
class RootController extends Controller<AnyEntity> {}

class RootState extends AppState<RootEntity> {
  constructor() {
		super();
		this.controller = new RootController(this.entities);
	}

  protected needsUpdate(key: AnyEntity["key"], newValue: AnyEntity["value"]): boolean {
    const value = this.controller.getValue(key);
    return !value.isEqual(newValue);
  }

  protected generateCache(value: RootEntity["value"]): RootEntity["cache"] {
    return {};
  }
}

export const StateManager = new RootState();

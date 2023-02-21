import { Entity, Controller, AppState } from "../../modules/StateManager";
import { UserState } from "./UserState";

type UsersListEntity = Entity<string, UserState, {}>;
class UsersListController extends Controller<UsersListEntity> {}

export class UsersListState extends AppState<UsersListEntity> {
	constructor() {
		super();
		this.controller = new UsersListController(this.entities);
	}

	protected needsUpdate(key: UsersListEntity["key"], newValue: UsersListEntity["value"]): boolean {
		return !this.controller.getValue(key).isEqual(newValue);
	}

	protected generateCache(_value: UsersListEntity["value"]): UsersListEntity["cache"] {
		return {};
	}
}

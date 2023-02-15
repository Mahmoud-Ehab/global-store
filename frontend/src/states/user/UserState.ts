import { Entity, Controller, AppState } from "../../modules/StateManager"

type UserInfo = {
	user_id: string,
	username: string
}

type UserEntity = Entity<"info", UserInfo, Partial<UserInfo>>;
class UserController extends Controller<UserEntity> {}

export class UserState extends AppState<UserEntity> {
	constructor(info: UserInfo) {
		super();
		this.controller = new UserController(this.entities);
		this.addEntity("info", info);
		this.addEntity = null;
	}

	protected generateCache(value: UserEntity["value"]): UserEntity["cache"] {
		return {...value};
	}
}

import { StateFactory } from "../../modules/StateManager/StateFactory";
import { UserData } from "..";

export const [User, UserList] = new StateFactory<UserData>().create();

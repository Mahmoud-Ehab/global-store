import { StateFactory } from "sfawd";
import { UserData } from ".";

export const [User, UserList] = new StateFactory<UserData>().create();

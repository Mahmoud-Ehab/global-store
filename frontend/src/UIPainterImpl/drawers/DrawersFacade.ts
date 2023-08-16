import { View, ViewDrawer } from "sfawd";

export interface DrawersFacade<V extends View<any, any>> {
  div(): ViewDrawer<V>;
  text(): ViewDrawer<V>;
  button(): ViewDrawer<V>;
}
import { View, ViewDrawer } from "../../modules/UIPainter/View";

export interface DrawersFacade<V extends View<any, any>> {
  div(): ViewDrawer<V>;
  text(): ViewDrawer<V>;
}
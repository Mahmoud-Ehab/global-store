import { Screen, ClassFile } from "./Screen";
import { View, ViewData } from "./View";

export interface UIApp<V extends View<ViewData, any>> {
  addScreen(screen: Screen, views: Array<V & ClassFile>): void;
  start(callback: Function): void;
  close(callback: Function): void;
}

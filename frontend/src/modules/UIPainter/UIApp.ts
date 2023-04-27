import { Screen } from "./Screen";
import { View, ViewData } from "./View";

export interface UIApp<V extends View<ViewData, any>> {
  addScreen(screen: Screen<object>, views: Array<V>): void;
  start(callback: Function): void;
  close(callback: Function): void;
}

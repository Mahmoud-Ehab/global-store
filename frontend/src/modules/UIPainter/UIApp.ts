import { Screen } from "./Screen";

export interface UIApp<S extends Screen<object>> {
  addScreen(screen: S): void;
  start(callback: Function): void;
  close(callback: Function): void;
}

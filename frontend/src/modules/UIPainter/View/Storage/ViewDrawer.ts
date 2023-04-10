import { ViewInterface } from "./ViewInterface";

export interface ViewDrawer<V extends ViewInterface<any>> {
  draw(view: V): void;
  update(view: V): void;
  destroy(view: V): void;
}

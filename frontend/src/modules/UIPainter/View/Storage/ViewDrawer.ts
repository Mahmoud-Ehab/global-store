import { View } from "./View";

export interface ViewDrawer<V extends View<any, any>> {
  draw(view: V): void;
  update(view: V): void;
  destroy(view: V): void;
}

import { ViewData } from "./Storage/ViewData";
import { View } from "./View";

export interface DrawStrategy<V extends View<ViewData, any>> {
  draw(view: V): void;
  update(view: V): void;
  destroy(view: V): void;
}

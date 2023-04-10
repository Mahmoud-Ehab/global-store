import { ViewInterface } from "./Storage/ViewInterface";

export interface DrawStrategy<V extends ViewInterface<any>> {
  draw(view: V): void;
  update(view: V): void;
  destroy(view: V): void;
}

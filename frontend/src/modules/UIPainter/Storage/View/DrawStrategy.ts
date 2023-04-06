import { StyleFactory } from "./StyleFactory";
import { View } from "./View";

export interface DrawStrategy {
  setStyle(style: StyleFactory): void;
  draw(view: View): void;
  update(view: View): void;
  destroy(view: View): void;
}
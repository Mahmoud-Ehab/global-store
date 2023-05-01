import { View } from "./View";
import { ViewData } from "./ViewData";

export abstract class ExtendedView<V extends View<ViewData, any>> {
  private view: V;

  constructor(view: V) {
    this.view = view;
  }

  myView(): V {
    return this.view;
  }

  draw() {
    this.view.draw();
  }
}
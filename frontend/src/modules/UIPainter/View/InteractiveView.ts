import { View } from "./Storage/View";
import { ViewData } from "./Storage/ViewData";

export abstract class InteractiveView<V extends View<any, any>> {
  private callbacks: Object;
  private view: V;

  constructor(view: V) {
    this.view = view;
  }

  myView() {
    return this.view;
  }

  setEvent(name: string, callback: Function) {
    this.callbacks[name] = [callback];
  }

  onEvent(name: string, callback: Function) {
    if (this.callbacks[name]) {
      this.callbacks[name].push(callback);
    }
    else {
      throw new Error(`There is no event with name "${name}".`);
    }
  }

  applyEvents() {
    if (this.myView().isDrawn()) {
      this.apply();
    }
    else {
      throw new Error("The view must be drawn before applying events.");
    }
  }

  protected apply() {
    throw new Error("Method not implemented.");
  }
}
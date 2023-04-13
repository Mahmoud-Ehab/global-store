import { View } from "./Storage/View";
import { ViewData } from "./Storage/ViewData";

export abstract class InteractiveView<D extends ViewData, S> extends View<D, S> {
  private callbacks: Object;

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

  apply() {
    throw new Error("Method not implemented.");
  }

  draw() {
    try {
      super.draw();
      this.apply();
    } 
    catch(e) {
      this.destroy();
      console.error(e);
    }
  }
}
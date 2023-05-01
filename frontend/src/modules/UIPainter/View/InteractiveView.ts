import { ExtendedView } from "./Storage/ExtendedView";
import { View } from "./Storage/View";

type InteractiveViewCallback = (view: View<any, any>) => void;
type CallbacksObject = {
  [name: string]: Array<InteractiveViewCallback>
}

export abstract class InteractiveView<V extends View<any, any>> extends ExtendedView<V> {
  protected callbacks: CallbacksObject;

  constructor(view: V) {
    super(view);
    this.callbacks = {};
  }

  setEvent(name: string, callback: InteractiveViewCallback) {
    this.callbacks[name] = [callback];
  }

  onEvent(name: string, callback: InteractiveViewCallback) {
    if (this.callbacks[name]) {
      this.callbacks[name].push(callback);
    }
    else {
      throw new Error(`There is no event with name "${name}".`);
    }
  }

  draw() {
    this.myView().draw();
    this.apply();
  }

  protected apply() {
    throw new Error("Method not implemented.");
  }
}
import { View } from "./Storage/View";

type InteractiveViewCallback = (view: View<any, any>) => void;
type CallbacksObject = {
  [name: string]: Array<InteractiveViewCallback>
}

export abstract class InteractiveView<V extends View<any, any>> {
  protected callbacks: CallbacksObject;
  private view: V;

  constructor(view: V) {
    this.view = view;
    this.callbacks = {};
  }

  myView() {
    return this.view;
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
    this.view.draw();
    this.apply();
  }

  protected apply() {
    throw new Error("Method not implemented.");
  }
}
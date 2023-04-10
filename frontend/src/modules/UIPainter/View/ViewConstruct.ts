import { View } from "./View";
import { ConstructiveView } from "./ConstructiveView";

export abstract class ViewConstruct {
  private view: View<any, any>;
  private parent: ConstructiveView<any, any>

  constructor(view: View<any, any>, parent: ConstructiveView<any, any>) {
    this.view = view;
    this.parent = parent;
    parent.addView(view);
  }

  getView() {
    return this.view;
  }

  destroy() {
    this.parent.rmvView(this.view.getId());
  }
}
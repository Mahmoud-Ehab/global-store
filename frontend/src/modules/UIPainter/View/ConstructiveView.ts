import { ViewData } from "./Storage/ViewData";
import { View } from "./Storage/View";

export class ConstructiveView<D extends ViewData, S> extends View<D, S> {
  private children: Array<View<any, any>>;

  getView(id: string) {
    return this.children.find((v) => v.getId() === id);
  }

  addView(view: View<any, any>) {
    const alreadyExist = this.children.find((v) => v === view)
    if (alreadyExist) {
      throw new Error("Cannot add the same view more than once.");
    }
    this.children.push(view);
    this.update();
  }

  rmvView(id: string) {
    let i: number = 0;
    for (; i < this.children.length; i++) {
      if (this.children[i].getId() === id)
        break;
    }
    
    const removedView = this.children.splice(i, 1)[0];
    if (removedView)
      removedView.destroy();
  }

  search(id: string) {
    if (this.getId() === id)
      return this;
    
    for (let view of this.children) {
      if (view instanceof ConstructiveView) {
        const inner_search = view.search(id);
        if (inner_search)
          return inner_search;
      }
      else {
        if (view.getId() === id)
          return view;
      }
    }

    return null;
  }

  draw() {
    super.draw();
    for (let view of this.children)
      view.draw();
  }

  update() {
    super.update();
    for (let view of this.children)
      view.update();
  }
}
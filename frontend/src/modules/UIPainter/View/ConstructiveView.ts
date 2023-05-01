import { ExtendedView } from "./Storage/ExtendedView";
import { View } from "./Storage/View";
import { ViewData } from "./Storage/ViewData";

export abstract class ConstructiveView<V extends View<ViewData, any>> extends ExtendedView<V> {
  private children: Array<ExtendedView<V>>;

  constructor(view: V) {
    super(view);
    this.children = [];
  }

  getView(id: string) {
    return this.children.find((v) => v.myView().getId() === id);
  }

  addView(view: ExtendedView<V>) {
    const alreadyExist = this.children.find((v) => v === view)
    if (alreadyExist) {
      throw new Error("Cannot add the same view more than once.");
    }
    else if (view.myView().isDrawn()) {
      throw new Error("Cannot add drawn views to a constructive view.");
    }

    view.myView().setParentId(this.myView().getId());
    this.children.push(view);
    this.update();
  }

  addViews(...views: ExtendedView<V>[]) {
    for (let view of views)
      this.addView(view);
  }

  rmvView(id: string) {
    let i: number = 0;
    for (; i < this.children.length; i++) {
      if (this.children[i].myView().getId() === id)
        break;
    }
    
    const removedView = this.children.splice(i, 1)[0];
    if (removedView)
      removedView.myView().destroy();
  }

  search(id: string) {
    if (this.myView().getId() === id)
      return this;
    
    for (let view of this.children) {
      if (view instanceof ConstructiveView) {
        const inner_search = view.search(id);
        if (inner_search)
          return inner_search;
      }
      else {
        if (view.myView().getId() === id)
          return view;
      }
    }

    return null;
  }

  draw() {
    this.myView().draw();
    for (let view of this.children) {
      view.draw();
    }
  }

  update() {
    this.myView().update();
    for (let view of this.children) {
      if (view instanceof ConstructiveView)
        view.update();
      else
        view.myView().update();  
    }
  }
}
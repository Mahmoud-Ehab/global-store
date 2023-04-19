import { AestheticView } from "./AestheticView";
import { InteractiveView } from "./InteractiveView";
import { View } from "./Storage/View";
import { ViewData } from "./Storage/ViewData";

type ViewTypes = ConstructiveView<any> | InteractiveView<any> | AestheticView<any>;

export class ConstructiveView<V extends View<ViewData, any>> {
  private children: Array<ViewTypes>;
  private view: V;

  constructor(view: V) {
    this.view = view;
    this.children = [];
  }

  myView(): V {
    return this.view;
  }

  getView(id: string) {
    return this.children.find((v) => v.myView().getId() === id);
  }

  addView(view: ViewTypes) {
    const alreadyExist = this.children.find((v) => v === view)
    if (alreadyExist) {
      throw new Error("Cannot add the same view more than once.");
    }

    const data = view.myView().getData();
    data.parentId = this.view.getId();
    view.myView().setData(data);
    
    this.children.push(view);
    this.update();
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
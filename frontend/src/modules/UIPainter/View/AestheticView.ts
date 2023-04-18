import { View } from "./Storage/View";
import { ViewAnimator } from "./Storage/ViewAnimator";
import { ViewData } from "./Storage/ViewData";

export abstract class AestheticView<V extends View<any, any>> {
  private animator: ViewAnimator<ViewData, any>;
  private view: V;

  constructor(view: V) {
    this.view = view;
  }

  myView() {
    return this.view;
  }

  setAnimator(animator: ViewAnimator<ViewData, any>) {
    this.animator = animator;
  }

  animate(from: Object, to: Object) {
    if (!this.animator) {
      throw new Error("Animator not found!");
    }
    this.animator.animate(this.myView(), from, to);
  }

  animateTo(style: any) {
    if (!this.animator) {
      throw new Error("Animator not found!");
    }
    this.animator.animateTo(this.myView(), style);
  }
}
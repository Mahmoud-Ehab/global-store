import { View } from "./Storage/View";
import { ViewAnimator } from "./Storage/ViewAnimator";
import { ViewData } from "./Storage/ViewData";

export abstract class AestheticView<D extends ViewData, S> {
  private animator: ViewAnimator<D, S>;
  private view: View<D, S>;

  constructor(view: View<D, S>) {
    this.view = view;
  }

  myView() {
    return this.view;
  }

  setAnimator(animator: ViewAnimator<D, S>) {
    this.animator = animator;
  }

  animate(from: S, to: S) {
    if (!this.animator) {
      throw new Error("Animator not found!");
    }
    this.animator.animate(this.myView(), from, to);
  }

  animateTo(style: S) {
    if (!this.animator) {
      throw new Error("Animator not found!");
    }
    this.animator.animateTo(this.myView(), style);
  }
}
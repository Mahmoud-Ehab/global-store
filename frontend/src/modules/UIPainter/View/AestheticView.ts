import { View } from "./Storage/View";
import { ViewAnimator } from "./Storage/ViewAnimator";
import { ViewData } from "./Storage/ViewData";

export abstract class AestheticView<D extends ViewData, S> extends View<D, S> {
  private animator: ViewAnimator<D, S>;

  setAnimator(animator: ViewAnimator<D, S>) {
    this.animator = animator;
  }

  animate(from: S, to: S) {
    if (!this.animator) {
      throw new Error("Animator not found!");
    }
    this.animator.animate(this, from, to);
  }

  animateTo(style: S) {
    if (!this.animator) {
      throw new Error("Animator not found!");
    }
    this.animator.animateTo(this, style);
  }
}
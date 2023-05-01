import { ExtendedView } from "./Storage/ExtendedView";
import { View } from "./Storage/View";
import { ViewAnimation } from "./Storage/ViewAnimation";
import { ViewAnimator } from "./ViewAnimator";

export abstract class AestheticView<V extends View<any, any>> extends ExtendedView<V> {
  private animator: ViewAnimator<any>;

  setAnimator(animator: ViewAnimator<any>) {
    this.animator = animator;
  }

  animate(anim: ViewAnimation<any>) {
    if (!this.animator) {
      throw new Error("Animator not found!");
    }
    this.animator.animate(this.myView(), anim);
  }

  animateTo(anim: ViewAnimation<any>) {
    if (!this.animator) {
      throw new Error("Animator not found!");
    }
    this.animator.animateTo(this.myView(), anim);
  }

  animateOnDraw(anim: ViewAnimation<any>) {
    this.myView().setOnDraw(() => this.animate(anim));
  }
}
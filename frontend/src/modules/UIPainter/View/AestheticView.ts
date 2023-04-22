import { View } from "./Storage/View";
import { ViewAnimation } from "./Storage/ViewAnimation";
import { ViewAnimator } from "./ViewAnimator";

export abstract class AestheticView<V extends View<any, any>> {
  private animator: ViewAnimator<any>;
  private view: V;

  constructor(view: V) {
    this.view = view;
  }

  myView() {
    return this.view;
  }

  draw() {
    this.view.draw();
  }

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
    this.view.setOnDraw(() => this.animate(anim));
  }
}
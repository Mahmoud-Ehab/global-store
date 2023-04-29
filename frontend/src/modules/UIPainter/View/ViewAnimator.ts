import { View } from "./Storage/View";
import { ViewAnimation } from "./Storage/ViewAnimation";

export class ViewAnimator<S> {
  private prefix: S;

  constructor(prefix: S) {
    this.prefix = prefix;
  }

  animate(view: View<any, S>, anim: ViewAnimation<S>) {
    view.setStyle({
      ...this.prefix, 
      ...anim.from
    });
    this.animateTo(view, anim);
  }

  animateTo(view: View<any, S>, anim: ViewAnimation<S>) {
    anim.to.forEach((stage, i) => {
      if (i === 0) {
        stage = {
          ...this.prefix,
          ...stage
        }
      }
      const dur = anim.durs[i] || anim.durs[0] || 1000;
      setTimeout(() => view.setStyle(stage), i > 0 ? dur * i : dur);
    });
  }
}
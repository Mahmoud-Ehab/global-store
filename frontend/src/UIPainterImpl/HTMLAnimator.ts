import { ViewAnimator } from "../modules/UIPainter/View/ViewAnimator";

export class HTMLAnimator extends ViewAnimator<Partial<CSSStyleDeclaration>> {
  constructor() {
    super({transitionDuration: "1s"});
  }
}
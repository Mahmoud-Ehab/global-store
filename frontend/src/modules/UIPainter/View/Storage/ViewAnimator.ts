import { View } from "./View";
import { ViewData } from "./ViewData";

export interface ViewAnimator<D extends ViewData, S> {
  animate(view: View<D, S>, from: S, to: S): void;
  animateTo(view: View<D, S>, to: S): void;
}
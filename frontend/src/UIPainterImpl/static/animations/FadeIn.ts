import { ViewAnimation } from "../../../modules/UIPainter/View/Storage/ViewAnimation";

export const FadeIn: ViewAnimation<Partial<CSSStyleDeclaration>> = {
  from: {opacity: '0',},
  to: [
    {opacity: "1"}
  ],
  durs: [1000]
} 
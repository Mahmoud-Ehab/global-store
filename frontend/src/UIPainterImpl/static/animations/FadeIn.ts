import { ViewAnimation } from "../../../modules/UIPainter/View/Storage/ViewAnimation";

export const FadeIn: ViewAnimation<Partial<CSSStyleDeclaration>> = {
  from: {
    opacity: '0',
    transitionDuration: "0",
  },
  to: [
    {
      opacity: "1",
      transitionDuration: "1s",
    }
  ],
  durs: [1000]
} 
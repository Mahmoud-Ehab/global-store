import { ViewAnimation } from "../../../modules/UIPainter/View/Storage/ViewAnimation";

export const FadeOut: ViewAnimation<Partial<CSSStyleDeclaration>> = {
  from: {
    opacity: '1',
    transitionDuration: "0",
  },
  to: [
    {
      opacity: "0",
      transitionDuration: "1s",
    }
  ],
  durs: [1000]
} 
import { ViewAnimation } from "../../../modules/UIPainter/View/Storage/ViewAnimation";

export const SlideToRight: ViewAnimation<Partial<CSSStyleDeclaration>> = {
  from: {
    transform: "translateX(0)",
    transitionDuration: "1s",
  },
  to: [
    { 
      transform: "translateX(200%)",
    }
  ],
  durs: [1000]
} 
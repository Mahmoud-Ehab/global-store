import { ViewAnimation } from "../../../modules/UIPainter/View/Storage/ViewAnimation";

export const SlideFromLeft: ViewAnimation<Partial<CSSStyleDeclaration>> = {
  from: {
    transform: "translateX(-200%)",
    transitionDuration: "0",
  },
  to: [
    { 
      transform: "translateX(0)", 
    }
  ],
  durs: [1000]
} 
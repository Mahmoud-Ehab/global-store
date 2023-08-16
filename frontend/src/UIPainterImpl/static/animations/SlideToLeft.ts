import { ViewAnimation } from "sfawd";

export const SlideToLeft: ViewAnimation<Partial<CSSStyleDeclaration>> = {
  from: {
    transform: "translateX(0)",
    transitionDuration: "0",
  },
  to: [
    { 
      transform: "translateX(-200%)", 
    }
  ],
  durs: [1000]
} 
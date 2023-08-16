import { ViewAnimation } from "sfawd";

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
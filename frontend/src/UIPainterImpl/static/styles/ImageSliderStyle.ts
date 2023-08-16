import { MediaQuery } from "@sfawd/html"

export const getImageSliderStyle = (mq?: MediaQuery): Partial<CSSStyleDeclaration> => ({
  position: "relative",
  display: "flex",
  flexFlow: "row",
  alignItems: "center",
  justifyContent: "space-around",
  overflow: "hidden",
})
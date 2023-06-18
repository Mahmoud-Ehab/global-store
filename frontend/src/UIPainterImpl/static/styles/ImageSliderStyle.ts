import { MediaQuery } from "../../MediaQuery";

export const ImageSliderStyle = (mq: MediaQuery): Partial<CSSStyleDeclaration> => ({
  position: "relative",
  display: "flex",

  flexFlow: "row",
  alignItems: "center",
  justifyContent: "space-around",

  width: "100%",
  height: mq.minWidth(768) ? "100%" : "25vh",

  overflow: "hidden",
})
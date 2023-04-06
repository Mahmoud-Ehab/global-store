import { ViewStyle } from "./Storage/ViewStyle";

export interface StyleFactory {
  getStyle(): ViewStyle;
}
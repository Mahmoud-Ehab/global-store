import { ScreenInfo } from "../modules/UIPainter/Storage";

export interface HTMLScreenInfo extends ScreenInfo {
  author?: string;
  description?: string;
  charset?: string;
  keywords?: string;
  title?: string;
  viewport?: string;
}

import { ScreenInfo } from "../modules/UIPainter/Screen";

export interface HTMLScreenInfo extends ScreenInfo {
  author?: string;
  description?: string;
  charset?: string;
  keywords?: string;
  title?: string;
  viewport?: string;
}

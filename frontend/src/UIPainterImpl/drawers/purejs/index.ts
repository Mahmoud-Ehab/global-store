import { ViewDrawer } from "../../../modules/UIPainter/View";
import { HTMLView } from "../../HTMLView";
import { DrawersFacade } from "../DrawersFacade";
import { HTMLDrawer } from "./HTMLDrawer";

export class PureJS_Drawers implements DrawersFacade<HTMLView> {
  div() {
    return new HTMLDrawer("div");
  }
  
  text() {
    return new HTMLDrawer("label");
  }

  button() {
    return new HTMLDrawer("button");
  }
}
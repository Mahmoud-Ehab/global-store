import { HTMLView } from "../../HTMLView";
import { DrawersFacade } from "../DrawersFacade";
import { DivDrawer } from "./DivDrawer";
import { TextDrawer } from "./TextDrawer";

export class PureJS_Drawers implements DrawersFacade<HTMLView> {
  div() {
    return new DivDrawer();
  }
  
  text() {
    return new TextDrawer();
  }
}
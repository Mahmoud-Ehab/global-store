import { HTMLView } from "../../HTMLView";
import { DrawersFacade } from "../DrawersFacade";
import { DivDrawer } from "./DivDrawer";

export class PureJS_Drawers implements DrawersFacade<HTMLView> {
  div() {
    return new DivDrawer();
  }
}
import { ConstructiveView } from "../../../modules/UIPainter/View";
import { GlobalDrawers } from "../../GlobalDrawers";
import { HTMLView } from "../../HTMLView";

export class Home extends ConstructiveView<HTMLView> {
  constructor() {
    super(new HTMLView(
      {id: "home", parentId: "root"}, 
      {width: "100%", height: "100%", backgroundColor: "#132321"}, 
      GlobalDrawers.div()
    ));
  }
}
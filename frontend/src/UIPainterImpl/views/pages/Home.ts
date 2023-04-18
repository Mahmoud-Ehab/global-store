import { ConstructiveView } from "../../../modules/UIPainter/View";
import { GlobalDrawers } from "../../GlobalDrawers";
import { HTMLView } from "../../HTMLView";
import { HomeStyle } from "../../static/styles/HomeStyle";

import { Header } from "../components/Header";

export class Home extends ConstructiveView<HTMLView> {
  constructor() {
    super(new HTMLView(
      {
        id: "home", 
        parentId: "root", 
        viewName: "Home"
      }, 
      HomeStyle, 
      GlobalDrawers.div()
    ));

    this.addView(new Header());
  }
}
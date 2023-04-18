import { ConstructiveView } from "../../../modules/UIPainter/View";
import { GlobalDrawers } from "../../GlobalDrawers";
import { HTMLView } from "../../HTMLView";
import { HeaderStyle } from "../../static/styles/HeaderStyle";
import { TextView } from "../mini-components/TextView";

export class Header extends ConstructiveView<HTMLView> {
  constructor() {
    super(new HTMLView(
      {
        id: "header", 
        parentId: "", 
        viewName: "Header"
      }, 
      HeaderStyle, 
      GlobalDrawers.div()
    ));

    const title = new TextView(
      "header-title",
      "Global Store",
      "100%",
      "#fff"
    );

    this.addView(title);
  }
}
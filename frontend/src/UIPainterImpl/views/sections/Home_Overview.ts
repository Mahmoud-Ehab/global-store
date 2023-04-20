import { ConstructiveView } from "../../../modules/UIPainter/View";
import { GlobalDrawers } from "../../GlobalDrawers";
import { HTMLView } from "../../HTMLView";
import { HomeStyle } from "../../static/styles/HomeStyle";
import { Container } from "../mini-components/Container";
import { TextView } from "../mini-components/TextView";

export class Home_Overview extends ConstructiveView<HTMLView> {
  constructor() {
    super(new HTMLView(
      {
        id: "home_overview", 
        parentId: "", 
      }, 
      HomeStyle.overview_sec.body, 
      GlobalDrawers.div()
    ));

    this.addView(leftpart);
    this.addView(rightpart);
  }
}

const leftpart = (() => {
  const container = new Container(
    "home_overview_leftpart", 
    HomeStyle.overview_sec.leftpart.body
  );

  container.addView(new TextView(
    "home_overview_desc",
    "GlobalStore is a free open-source application for online shopping, whose only purpose is to connect between customers and vendors / freelancers / service providers.",
    HomeStyle.overview_sec.leftpart.text
  ));

  return container;
})()

const rightpart = (() => {
  const container = new Container(
    "home_overview_rightpart", 
    HomeStyle.overview_sec.rightpart.body
  );
  return container;
})()
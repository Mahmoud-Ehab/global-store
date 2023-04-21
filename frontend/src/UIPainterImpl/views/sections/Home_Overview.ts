import { ConstructiveView } from "../../../modules/UIPainter/View";
import { GlobalDrawers } from "../../GlobalDrawers";
import { HTMLView } from "../../HTMLView";
import { getParagraphes } from "../../static/strings/paragraphes";
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
    
    const lang = this.myView().lang;
    this.addView(leftpart(lang));
    this.addView(rightpart);
  }
}

const leftpart = (lang: string) => {
  const container = new Container(
    "home_overview_leftpart", 
    HomeStyle.overview_sec.leftpart.body
  );

  container.addView(new TextView(
    "home_overview_desc",
    getParagraphes(lang).overview,
    HomeStyle.overview_sec.leftpart.text
  ));

  return container;
}

const rightpart = (() => {
  const container = new Container(
    "home_overview_rightpart", 
    HomeStyle.overview_sec.rightpart.body
  );
  return container;
})()
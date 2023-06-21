import { ConstructiveView } from "../../../modules/UIPainter/View";
import { GlobalDrawers } from "../../GlobalDrawers";

import { HTMLView } from "../../HTMLView";
import { HomeStyle } from "../../static/styles/HomeStyle";
import { ImagesSlider } from "../components/ImagesSlider";
import { Container } from "../mini-components/Container";
import { ImageView } from "../mini-components/ImageView";
import { TextView } from "../mini-components/TextView";
import { Navigation } from "../components/Navigation";

import { getParagraphes } from "../../static/strings/paragraphes";
import { getPaths } from "../../static/strings/paths";
import { MediaQuery } from "../../MediaQuery";

import { FadeIn } from "../../static/animations/FadeIn";

export class Home_Overview extends ConstructiveView<HTMLView> {
  constructor() {
    const mq = new MediaQuery();
    super(new HTMLView(
      {
        id: "home_overview", 
        parentId: "", 
      }, 
      HomeStyle(mq).overview_sec.body, 
      GlobalDrawers.div()
    ));
    
    const lang = this.myView().lang;
    this.addView(leftpart(lang, mq));
    this.addView(new Navigation());
  }
}

const leftpart = (lang: string, mq: MediaQuery) => {
  const container = new Container(
    "home_overview_leftpart", 
    HomeStyle(mq).overview_sec.leftpart.body
  );

  const descView = new TextView(
    "home_overview_desc",
    getParagraphes(lang).overview,
    HomeStyle(mq).overview_sec.leftpart.text
  );
  descView.animateOnDraw(FadeIn);
  container.addView(descView);

  const imageSlider = new ImagesSlider(
    "home_overview_images",
    [
      new ImageView("home_sec1_img1", getPaths().home_sec1_img1),
      new ImageView("home_sec1_img2", getPaths().home_sec1_img2),
      new ImageView("home_sec1_img3", getPaths().home_sec1_img3)
    ],
    4000
  );
  imageSlider.play();
  container.addView(imageSlider);

  return container;
}

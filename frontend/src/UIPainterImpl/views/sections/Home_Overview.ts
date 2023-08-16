import { ConstructiveView } from "sfawd";
import { HTMLView } from "@sfawd/html";

import { GlobalDrawers } from "../../GlobalDrawers";
import { HomeStyle } from "../../static/styles/HomeStyle";
import { ImagesSlider } from "../components/ImagesSlider";
import { Container } from "../mini-components/Container";
import { ImageView } from "../mini-components/ImageView";
import { TextView } from "../mini-components/TextView";

import { FadeIn } from "../../static/animations/FadeIn";

import { getParagraphes } from "../../static/strings/paragraphes";
import { getPaths } from "../../static/strings/paths";
import { Button } from "../mini-components/Button";
import { getLabels } from "../../static/strings/labels";

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
    this.addView(rightpart(lang));
  }
}

const leftpart = (lang: string) => {
  const container = new Container(
    "home_overview_leftpart", 
    HomeStyle.overview_sec.leftpart.body
  );

  const descView = new TextView(
    "home_overview_desc",
    getParagraphes(lang).overview,
    HomeStyle.overview_sec.leftpart.text
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


const rightpart = (lang: string) => {
  const container = new Container(
    "home_overview_rightpart", 
    HomeStyle.overview_sec.rightpart.body
  );

  const exploreBtn = new Button(
    "home_overview_explore", "",
    HomeStyle.overview_sec.rightpart.button("#718093")
  );

  exploreBtn.setText(
    "explore_btn_text", 
    getLabels(lang).buttons.explore, 
    {color: "inheret"}
  );
  exploreBtn.setIcon("explore_btn_icon", getPaths().explore_icon);
  exploreBtn.setHover({
    color: "#f1f1f1",
    backgroundColor: "#71809388",
    transition: "250ms"
  });
  
  container.addView(exploreBtn);
  return container;
}

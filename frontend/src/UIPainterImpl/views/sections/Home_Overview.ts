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
import { Button } from "../mini-components/Button";
import { StateManager } from "../../../StateManagerImpl";

export class Home_Overview extends ConstructiveView<HTMLView> {
  constructor() {
    const mq = StateManager.get("mediaQuery").toObject().value;
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
  const style = HomeStyle(mq).overview_sec.leftpart;
  const container = new Container(
    "home_overview_leftpart", 
    style.body
  );

  const descView = new TextView(
    "home_overview_desc",
    getParagraphes(lang).overview,
    style.text
  );
  descView.animateOnDraw(FadeIn);

  const imageSlider = new ImagesSlider(
    "home_overview_images",
    [
      new ImageView("home_sec1_img1", getPaths().home_sec1_img1),
      new ImageView("home_sec1_img2", getPaths().home_sec1_img2),
      new ImageView("home_sec1_img3", getPaths().home_sec1_img3)
    ],
    4000,
    style.imageSlider,
    mq.maxWidth("taplet_small")
  );
  imageSlider.play();

  const signDiv = new Container(
    "home_overview_signdiv",
    style.signDiv.body
  );
  signDiv.addViews(
    new Button(
      "home_overview_signdiv_registerbtn", 
      "Register",
      style.signDiv.registerBtn
    ),
    new Button(
      "home_overview_signdiv_loginbtn", 
      "Login", 
      style.signDiv.loginBtn
    ),
  );

  container.addViews(
    descView, 
    imageSlider, 
    signDiv
  );
  return container;
}

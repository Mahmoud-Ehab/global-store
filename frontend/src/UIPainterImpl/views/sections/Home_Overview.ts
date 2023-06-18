import { ConstructiveView } from "../../../modules/UIPainter/View";
import { GlobalDrawers } from "../../GlobalDrawers";
import { HTMLView } from "../../HTMLView";
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
import { MediaQuery } from "../../MediaQuery";

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
    this.addView(rightpart(lang, mq));
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


const rightpart = (lang: string, mq: MediaQuery) => {
  const container = new Container(
    "home_overview_rightpart", 
    HomeStyle(mq).overview_sec.rightpart.body
  );
  
  container.addView(createNavBtn({
    name: "explore",
    label: getLabels(lang).buttons.explore,
    iconPath: getPaths().explore_icon,
    lang: lang,
    mediaQuery: mq
  }));

  container.addView(createNavBtn({
    name: "favorite",
    label: getLabels(lang).buttons.favorites,
    iconPath: getPaths().favorites_icon,
    color: "#FF7675",
    lang: lang,
    mediaQuery: mq
  }));

  container.addView(createNavBtn({
    name: "dashboard",
    label: getLabels(lang).buttons.dashboard,
    iconPath: getPaths().dashboard_icon,
    color: "#545454",
    lang: lang,
    mediaQuery: mq
  }));

  container.addView(createNavBtn({
    name: "Polls",
    label: getLabels(lang).buttons.polls,
    iconPath: getPaths().polls_icon,
    color: "#718093",
    lang: lang,
    mediaQuery: mq
  }));

  container.addView(createNavBtn({
    name: "Settings",
    label: getLabels(lang).buttons.settings,
    iconPath: getPaths().settings_icon,
    color: "#36C0C8",
    lang: lang,
    mediaQuery: mq
  }));

  return container;
}


const createNavBtn = (data: {
  name: string,
  label: string,
  iconPath: string,
  lang: string,
  mediaQuery: MediaQuery,
  color?: string,
}) => {
  const btn = new Button(
    "nav_btn_" + data.name, "",
    HomeStyle(data.mediaQuery).overview_sec.rightpart.button(data.color || "#718093")
  );

  btn.setText(
    data.name + "_btn_text", 
    data.label, 
    {color: "inheret"}
  );
  btn.setIcon(data.name + "_btn_icon", data.iconPath);
  btn.setHover({
    color: "#f1f1f1",
    backgroundColor: (data.color || "#718093") + "88",
    transition: "250ms"
  });

  return btn;
}

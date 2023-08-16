import { ConstructiveView } from "sfawd";
import { HTMLView, MediaQuery } from "@sfawd/html";

import { GlobalDrawers } from "../../GlobalDrawers";
import { getLabels } from "../../static/strings/labels";
import { HeaderStyle } from "../../static/styles/HeaderStyle";
import { Button } from "../mini-components/Button";
import { TextView } from "../mini-components/TextView";

export class Header extends ConstructiveView<HTMLView> {
  constructor() {
    super(new HTMLView(
      {
        id: "header", 
        parentId: "", 
      }, 
      HeaderStyle.body, 
      GlobalDrawers.div()
    ));

    const mq = this.myView().mq;
    const lang = this.myView().lang;
    this.addView(getTextView(lang, mq));

    const rightBtn = mq.minWidth("laptop_small") ? getLoginButton(lang) : getNavBtn();
    this.addView(rightBtn);
  }
}

const getTextView = (lang: string, mq: MediaQuery) => {
  return new TextView(
    "header-title",
    getLabels(lang).titles.header,
    HeaderStyle.title(mq)
  )
}

const getLoginButton = (lang: string) => {
  const button = new Button(
    "header-login-btn", 
    getLabels(lang).buttons.login
  );

  button.setStyle(HeaderStyle.loginBtn.normal);
  button.setHover(HeaderStyle.loginBtn.hover);
  button.setEvent("onclick", () => {
    const hyperlink = document.createElement('a');
    hyperlink.href = "/login";
    hyperlink.click();
  });

  return button;
};

const getNavBtn = () => {
  const button = new Button(
    "header-nav-btn",
    "Nav"
  );
  return button;
}
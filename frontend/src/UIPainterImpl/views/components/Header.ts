import { ConstructiveView } from "sfawd";
import { HTMLView } from "@sfawd/html";

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
    
    const lang = this.myView().lang;
    this.addView(textView);
    this.addView(loginButton(lang));
  }
}

const textView = (() => {
  return new TextView(
    "header-title",
    "Global Store",
    HeaderStyle.title
  )
})();

const loginButton = (lang: string) => {
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
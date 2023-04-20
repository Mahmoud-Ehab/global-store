import { ConstructiveView } from "../../../modules/UIPainter/View";
import { GlobalDrawers } from "../../GlobalDrawers";
import { HTMLView } from "../../HTMLView";
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

    this.addView(textView);
    this.addView(loginButton);
  }
}

const textView = (() => {
  return new TextView(
    "header-title",
    "Global Store",
    HeaderStyle.title
  )
})();

const loginButton = (() => {
  const button = new Button(
    "header-login-btn", 
    "Login"
  );

  button.setStyle(HeaderStyle.loginBtn.normal);
  button.setHover(HeaderStyle.loginBtn.hover);
  button.setEvent("onclick", () => {
    const hyperlink = document.createElement('a');
    hyperlink.href = "/login";
    hyperlink.click();
  });

  return button;
})();
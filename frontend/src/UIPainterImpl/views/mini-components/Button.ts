import { InteractiveView } from "sfawd";
import { HTMLView } from "@sfawd/html";

import { GlobalDrawers } from "../../GlobalDrawers";
import { ButtonStyle } from "../../static/styles/ButtonStyle";
import { ImageView } from "./ImageView";
import { TextView } from "./TextView";

export class Button extends InteractiveView<HTMLView> {
  private normalStyle: Partial<CSSStyleDeclaration>;
  private hoverStyle: Partial<CSSStyleDeclaration>;

  private icon: ImageView;
  private textView: TextView;

  constructor(id: string, text: string, style?: Partial<CSSStyleDeclaration>) {
    super(new HTMLView(
      {
        id, 
        parentId: "", 
        text,
      }, 
      {
        ...ButtonStyle,
        ...style
      }, 
      GlobalDrawers.button()
    ));

    this.normalStyle = {...style};
    this.hoverStyle = {};

    this.setEvent("onmouseout", (view) => view.setStyle(this.normalStyle));
    this.setEvent("onmouseover", (view) => view.setStyle(this.hoverStyle));
  }

  draw() {
    super.draw();
    if (this.icon)
      this.icon.draw();
    if (this.textView)
      this.textView.draw();
  }

  setStyle(style: Partial<CSSStyleDeclaration>) {
    this.normalStyle = style;
    this.myView().setStyle(style);
  }

  setHover(hover: Partial<CSSStyleDeclaration>) {
    this.hoverStyle = hover;
  }

  setText(id: string, text: string, style?: Partial<CSSStyleDeclaration>) {
    const textView = new TextView(id, text, style);
    textView.myView().setParentId(this.myView().getId());
    this.textView = textView;
  }

  setIcon(id: string, src: string, style?: Partial<CSSStyleDeclaration>) {
    const imgView = new ImageView(id, src, style);
    imgView.myView().setParentId(this.myView().getId());
    this.icon = imgView;
  }

  protected apply(): void {
    const element = this.myView().getElement();
    for (let key in this.callbacks) {
      element[key] = () => {
        for (let handler of this.callbacks[key]) {
          handler(this.myView());
        }
      }
    }
  }
}
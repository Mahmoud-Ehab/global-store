import { InteractiveView } from "../../../modules/UIPainter/View";
import { GlobalDrawers } from "../../GlobalDrawers";
import { HTMLView } from "../../HTMLView";
import { ButtonStyle } from "../../static/styles/ButtonStyle";

export class Button extends InteractiveView<HTMLView> {
  private normalStyle: Partial<CSSStyleDeclaration>;
  private hoverStyle: Partial<CSSStyleDeclaration>;

  constructor(id: string, text: string, style?: Partial<CSSStyleDeclaration>) {
    super(new HTMLView(
      {
        id, 
        parentId: "", 
        viewName: "Button",
        text,
      }, 
      {
        ...ButtonStyle,
        ...style
      }, 
      GlobalDrawers.button()
    ));

    this.normalStyle = style;
    this.hoverStyle = {};

    this.setEvent("onmouseout", (view) => view.setStyle(this.normalStyle));
    this.setEvent("onmouseover", (view) => view.setStyle(this.hoverStyle));
  }

  setStyle(style: Partial<CSSStyleDeclaration>) {
    this.normalStyle = style;
    this.myView().setStyle(style);
  }

  setHover(hover: Partial<CSSStyleDeclaration>) {
    this.hoverStyle = hover;
  }

  protected apply(): void {
    const element = this.myView().getElement();
    for (let key in this.callbacks) {
      element[key] = () => {
        for (let call of this.callbacks[key]) {
          call(this.myView());
        }
      }
    }
  }
}
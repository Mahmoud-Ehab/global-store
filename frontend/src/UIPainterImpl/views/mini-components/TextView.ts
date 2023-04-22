import { AestheticView } from "../../../modules/UIPainter/View";
import { GlobalDrawers } from "../../GlobalDrawers";
import { HTMLAnimator } from "../../HTMLAnimator";
import { HTMLView } from "../../HTMLView";
import { TextStyle } from "../../static/styles/TextStyle";

export class TextView extends AestheticView<HTMLView> {
  constructor(id: string, text: string, style?: Partial<CSSStyleDeclaration>) {
    super(new HTMLView(
      {
        id, 
        parentId: "", 
        text,
      }, 
      {
        ...TextStyle,
        ...style
      }, 
      GlobalDrawers.text()
    ));
    
    this.setAnimator(new HTMLAnimator());
  }
}
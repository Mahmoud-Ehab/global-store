import { ConstructiveView } from "../../../modules/UIPainter/View";
import { GlobalDrawers } from "../../GlobalDrawers";
import { HTMLView } from "../../HTMLView";

export class Container extends ConstructiveView<HTMLView> {
  constructor(id: string, style?: Partial<CSSStyleDeclaration>) {
    super(new HTMLView(
      {
        id,
        parentId: ""
      },
      {...style},
      GlobalDrawers.div()
    ));
  }
}
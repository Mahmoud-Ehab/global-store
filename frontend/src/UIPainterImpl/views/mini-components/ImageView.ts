import { AestheticView } from "../../../modules/UIPainter/View";
import { GlobalDrawers } from "../../GlobalDrawers";
import { HTMLView } from "../../HTMLView";

export class ImageView extends AestheticView<HTMLView> {
  constructor(id: string, src: string, style?: Partial<CSSStyleDeclaration>) {
    super(new HTMLView(
      {
        id,
        src,
        parentId: ""
      },
      {...style},
      GlobalDrawers.image()
    ));
  }
}
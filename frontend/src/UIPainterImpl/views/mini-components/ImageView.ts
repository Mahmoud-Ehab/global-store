import { AestheticView } from "sfawd";
import { HTMLView } from "@sfawd/html";

import { GlobalDrawers } from "../../GlobalDrawers";

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
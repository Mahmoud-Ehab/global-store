import { ConstructiveView } from "sfawd";
import { HTMLView } from "@sfawd/html";

import { GlobalDrawers } from "../../GlobalDrawers";

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
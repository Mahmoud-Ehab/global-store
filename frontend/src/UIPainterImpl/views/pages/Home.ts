import { NumberState, StateManager, StringState } from "../../../StateManagerImpl";
import { ConstructiveView } from "../../../modules/UIPainter/View";
import { GlobalDrawers } from "../../GlobalDrawers";
import { HTMLView } from "../../HTMLView";
import { HomeStyle } from "../../static/styles/HomeStyle";

import { Header } from "../components/Header";
import { Home_Overview } from "../sections/Home_Overview";

export class Home extends ConstructiveView<HTMLView> {
  constructor(lang: string, width: number, height: number) {
    StateManager.addEntity("lang", new StringState({value: lang}));
    StateManager.addEntity("screenWidth", new NumberState({value: width}));
    StateManager.addEntity("screenHeight", new NumberState({value: height}));

    super(new HTMLView(
      {
        id: "home", 
        parentId: "root", 
        viewName: "Home"
      }, 
      HomeStyle.body, 
      GlobalDrawers.div()
    ));
    
    this.addView(new Header());
    this.addView(new Home_Overview());
  }
}
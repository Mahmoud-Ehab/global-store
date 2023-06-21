import { 
  NumberState, 
  StringState, 
  ObjectState,
  StateManager 
} from "../../../StateManagerImpl";

import { ConstructiveView } from "../../../modules/UIPainter/View";
import { GlobalDrawers } from "../../GlobalDrawers";
import { HTMLView } from "../../HTMLView";
import { MediaQuery } from "../../MediaQuery";
import { HomeStyle } from "../../static/styles/HomeStyle";

import { Header } from "../components/Header";
import { Home_Overview } from "../sections/Home_Overview";

export class Home extends ConstructiveView<HTMLView> {
  constructor(lang: string, width: number, height: number) {
    StateManager.addEntity("lang", new StringState({value: lang}));
    StateManager.addEntity("screenWidth", new NumberState({value: width}));
    StateManager.addEntity("screenHeight", new NumberState({value: height}));

    const mediaQuery = new MediaQuery();
    StateManager.addEntity("mediaQuery", new ObjectState({value: mediaQuery}));

    super(new HTMLView(
      {
        id: "home", 
        parentId: "root", 
        viewName: "Home"
      }, 
      HomeStyle(mediaQuery).body, 
      GlobalDrawers.div()
    ));
    
    this.addView(new Header());
    this.addView(new Home_Overview());
  }
}
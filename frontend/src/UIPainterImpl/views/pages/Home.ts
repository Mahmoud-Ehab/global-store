import { StateManager, ConstructiveView } from "sfawd";
import { HTMLView, MediaQuery } from "@sfawd/html";

import { 
  NumberState, 
  StringState, 
  ObjectState,
} from "../../../StateManagerImpl";

import { GlobalDrawers } from "../../GlobalDrawers";
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
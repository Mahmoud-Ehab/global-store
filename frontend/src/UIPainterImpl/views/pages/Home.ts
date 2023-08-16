import { ConstructiveView } from "sfawd";
import { HTMLView } from "@sfawd/html";

import { StateManager } from "sfawd";
import { StringState } from "../../../StateManagerImpl";

import { GlobalDrawers } from "../../GlobalDrawers";
import { HomeStyle } from "../../static/styles/HomeStyle";
import { Header } from "../components/Header";
import { Home_Overview } from "../sections/Home_Overview";

export class Home extends ConstructiveView<HTMLView> {
  constructor(lang: string) {
    StateManager.addEntity("lang", new StringState({value: lang}));

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
import { StateManager } from "../StateManagerImpl";
import { ClassFile } from "../modules/UIPainter/Screen";
import { AestheticView } from "../modules/UIPainter/View";
import { View } from "../modules/UIPainter/View/Storage/View";
import { HTMLAnimator } from "./HTMLAnimator";
import { HTMLDrawer } from "./drawers/purejs/HTMLDrawer";

type HTMLData = {
  id: string;
  parentId: string;
  viewName?: string; // the name of both file & class
  text?: string;
  href?: string;
  src?: string;
}

type HTMLStyle = Partial<CSSStyleDeclaration>

export class HTMLView extends View<HTMLData, HTMLStyle> implements ClassFile {
  private element: HTMLElement;
  public lang: string;

  constructor(data: HTMLData, style: HTMLStyle, drawer: HTMLDrawer) {
    super(data, style, drawer);
    if (StateManager.get("lang")) {
      this.lang = StateManager.get("lang").get("info").value;
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }

  setElement(element: HTMLElement) {
    this.element = element;
  }

  getFilePath(): string {
    return `./views/${this.getData().viewName}.js`;
  }
  
  getClassName(): string {
    return this.getData().viewName;
  }
}

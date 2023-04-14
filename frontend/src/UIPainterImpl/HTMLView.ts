import { ClassFile } from "../modules/UIPainter/Screen";
import { View } from "../modules/UIPainter/View/Storage/View";

type Data = {
  id: string;
  parentId: string;
  text?: string;
}

type Style = Partial<CSSStyleDeclaration>

export class HTMLView extends View<Data, Style> implements ClassFile {
  private element: HTMLElement;

  getElement(): HTMLElement {
    return this.element;
  }

  setElement(element: HTMLElement) {
    this.element = element;
  }

  getFilePath(): string {
    // return the file path that shall be used after compilation
    // @TODO: make it dynamic.
    return "./views/pages/Home.js";
  }
  
  getClassName(): string {
    return "Home";
  }
}

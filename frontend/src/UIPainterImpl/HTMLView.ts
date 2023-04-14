import { ClassFile } from "../modules/UIPainter/Screen";
import { View } from "../modules/UIPainter/View/Storage/View";

type Data = {
  id: string;
  parentId: string;
  viewName: string; // the name of both file & class
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
    return `./views/${this.getData().viewName}.js`;
  }
  
  getClassName(): string {
    return this.getData().viewName;
  }
}

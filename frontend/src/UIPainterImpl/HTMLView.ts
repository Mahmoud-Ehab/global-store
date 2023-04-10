import { View } from "../modules/UIPainter/View";

type Data = {
  id: string;
  parentId: string;
  text?: string;
}

type Style = Partial<CSSStyleDeclaration>

export abstract class HTMLView extends View<Data, Style> {
  private element: HTMLElement;

  getElement(): HTMLElement {
    return this.element;
  }

  setElement(element: HTMLElement) {
    this.element = element;
  }
}
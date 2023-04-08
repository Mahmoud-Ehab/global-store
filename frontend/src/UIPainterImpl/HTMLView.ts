import { View, ViewData } from "../modules/UIPainter/Storage";

export abstract class HTMLView extends View<ViewData, Partial<CSSStyleDeclaration>> {
  private element: HTMLElement;

  getElement(): HTMLElement {
    return this.element;
  }

  setElement(element: HTMLElement) {
    this.element = element;
  }
}
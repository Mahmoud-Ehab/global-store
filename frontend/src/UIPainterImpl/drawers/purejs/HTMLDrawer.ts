import { ViewDrawer } from "../../../modules/UIPainter/View";
import { HTMLView } from "../../HTMLView";

type ExtendCallback = (element: HTMLElement, view: HTMLView) => void;

export class HTMLDrawer implements ViewDrawer<HTMLView> {
  private tagName: string;
  private drawExtention: ExtendCallback;
  private updateExtention: ExtendCallback;

  constructor(htmlTagName: string) {
    this.tagName = htmlTagName;
  }

  setDrawExtention(extendFunc: ExtendCallback) {
    this.drawExtention = extendFunc;
  }

  setUpdateExtention(extendFunc: ExtendCallback) {
    this.updateExtention = extendFunc;
  }

  draw(view: HTMLView): void {
    const data = view.getData();
    const style = view.getStyle();

    if (document.getElementById(data.id)) {
      throw new Error("There is already a view with id: " + data.id);
    }

    const element = document.createElement(this.tagName);
    element.id = data.id;
    element.textContent = data.text;

    if (this.drawExtention)
      this.drawExtention(element, view);

    if (style) {
      let key: keyof typeof style;
      for (key in style)
        element.style[key] = style[key];
    }

    if (data.parentId) {
      const parent = document.getElementById(data.parentId);
      if (parent)
        parent.appendChild(element);
      else
        throw new Error(`There is no view with id: ${data.parentId}`);
    }
    else {
      document.body.appendChild(element);
    }
    
    view.setElement(element);
  }
  
  update(view: HTMLView): void {
    const element = view.getElement();
    const data = view.getData();
    const style = view.getStyle();

    if (!element) {
      throw new Error("Can't find view with id " + data.id);
    }
    element.textContent = data.text;

    if (this.updateExtention)
      this.updateExtention(element, view);

    let key: keyof typeof style;
    for (key in style) {
      element.style[key] = style[key];
    }
  }

  destroy(view: HTMLView): void {
    view.getElement().remove();
  }
}
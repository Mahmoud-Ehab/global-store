import { 
  DrawStrategy, 
  ViewData,
} from "../../modules/UIPainter/Storage";
import { HTMLView } from "../HTMLView";

export class ContainerDrawer implements DrawStrategy<HTMLView> {
  draw(view: HTMLView): void {
    const data = view.getData();
    const style = view.getStyle();

    if (document.getElementById(data.id)) {
      throw new Error("There is already a view with id: " + data.id);
    }

    const element = document.createElement("div");
    element.id = data.id;
    element.textContent = data.text;

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

    let key: keyof typeof style;
    for (key in style) {
      element.style[key] = style[key];
    }
  }

  destroy(view: HTMLView): void {
    view.getElement().remove();
  }
}
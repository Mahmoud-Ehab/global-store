import { ViewData } from "./Storage/ViewData";
import { DrawStrategy } from "./DrawStrategy";

type V = View<ViewData, any>;

export abstract class View<D extends ViewData, S> {
  private data: D;
  private style: S;
  private drawer: DrawStrategy<V>;
  private drawn: boolean = false;

  private onDrawCallback: Function;
  private onUpdateCallback: Function;
  private onDestroyCallback: Function;

  constructor(data: D, style: S, drawer: DrawStrategy<V>) {
    this.data = data;
    this.style = style;
    this.drawer = drawer;
  }

  getId(): string {
    return this.data.id;
  }

  getData(): D {
    return this.data;
  }

  getStyle(): S {
    return this.style;
  }

  setData(data: D) {
    let invokeUpdate = false;

    let key: keyof D;
    for (key in data) {
      if (key === "id" || key === "parentId") {
        if (this.data[key] !== data[key])
          throw new Error("Cannot update id attributes.");
      }
      else if (this.data[key] !== data[key]) {
        this.data[key] = data[key];
        invokeUpdate = true;
      }
    }

    if (invokeUpdate)
      this.update();
  }

  setStyle(style: S) {
    let invokeUpdate = false;

    let key: keyof S;
    for (key in style) {
      if (this.style[key] !== style[key]) {
        this.style[key] = style[key];
        invokeUpdate = true;
      }
    }

    if (invokeUpdate)
      this.update();
  }

  draw() {
    if (!this.drawn) {
      this.drawer.draw(this);
      this.drawn = true;
      if (this.onDrawCallback) {
        this.onDrawCallback(this);
      }
    }
  }

  update() {
    if (this.drawn) {
      this.drawer.update(this);
      if (this.onUpdateCallback) {
        this.onUpdateCallback(this);
      }
    }
  }

  destroy() {
    if (this.drawn) {
      this.drawer.destroy(this);
      if (this.onDestroyCallback) {
        this.onDestroyCallback(this);
      }
    }
  }

  onDraw(callback: Function) {
    this.onDrawCallback = callback;
  }

  onUpdate(callback: Function) {
    this.onUpdateCallback = callback;
  }

  onDestroy(callback: Function) {
    this.onDestroyCallback = callback;
  }
}

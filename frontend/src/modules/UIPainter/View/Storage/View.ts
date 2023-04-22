import { ViewData } from "./ViewData";
import { ViewDrawer } from "./ViewDrawer";

type V = View<ViewData, any>;

export abstract class View<D extends ViewData, S extends Object> {
  private data: D;
  private style: S;
  private drawer: ViewDrawer<V>;
  private drawn: boolean = false;

  private onDrawCallback: Function;
  private onUpdateCallback: Function;
  private onDestroyCallback: Function;

  constructor(data: D, style: S, drawer: ViewDrawer<V>) {
    this.data = data;
    this.style = style;
    this.drawer = drawer;
  }

  myView() {
    return this;
  }

  getId(): string {
    return this.data.id;
  }

  getData(): D {
    return Object.create(this.data);
  }

  getStyle(): S {
    return Object.create(this.style);
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

  setParentId(id: string) {
    if (this.drawn)
      throw new Error("Cannot change parentId after drawing.");

    this.data.parentId = id;
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

  isDrawn() {
    return this.drawn;
  }

  update() {
    if (!this.drawn)
      return;

    this.drawer.update(this);
    if (this.onUpdateCallback) {
      this.onUpdateCallback(this);
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

  setOnDraw(callback: Function) {
    this.onDrawCallback = callback;
  }

  setOnUpdate(callback: Function) {
    this.onUpdateCallback = callback;
  }

  setOnDestroy(callback: Function) {
    this.onDestroyCallback = callback;
  }
}

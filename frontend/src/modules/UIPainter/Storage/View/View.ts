import { ViewData } from "./Storage/ViewData";
import { DrawStrategy } from "./DrawStrategy";
import { StyleFactory } from "./StyleFactory";

export abstract class View {
  private data: ViewData;
  private drawer: DrawStrategy;
  private drawn: boolean = false;

  constructor(data: ViewData, drawer: DrawStrategy) {
    this.data = data;
    this.drawer = drawer;
  }

  getId(): string {
    return this.data.id;
  }

  getData(): ViewData {
    return this.data;
  }

  setStyle(style: StyleFactory) {
    this.drawer.setStyle(style);
  }

  draw() {
    if (!this.drawn) {
      this.drawer.draw(this);
      this.drawn = true;
    }
  }

  update() {
    if (this.drawn)
      this.drawer.update(this);
  }

  destroy() {
    if (this.drawn)
      this.drawer.destroy(this);
  }
}

import { ViewData } from "./ViewData";

export interface ViewInterface<S> {
  getId(): string;

  getData(): ViewData;
  getStyle(): S;
  
  setData(data: ViewData): void;
  setStyle(style: S): void;

  draw(): void;
  update(): void;
  destroy(): void;

  onDraw(callback: Function): void;
  onUpdate(callback: Function): void;
  onDestroy(callback: Function): void;
}
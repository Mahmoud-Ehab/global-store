import { ClassFile } from "./Storage/ClassFile";
import { ScreenInfo } from "./Storage/ScreenInfo";
import { View, ViewData } from "../View";

export abstract class Screen {
  protected name: string;
  protected width: number;
  protected height: number;

  constructor(info: ScreenInfo) {
    this.name = info.name || "index";
    this.width = info.width || 600;
    this.height = info.height || 600;
    this.init(info);
  }

  protected init(info: ScreenInfo) {
    throw Error("method is not implemented.");
  }

  apply(view: View<ViewData, any> & ClassFile) {
    throw Error("method is not implemented.");
  }

  create() {
    throw Error("method is not implemented.");
  }
}
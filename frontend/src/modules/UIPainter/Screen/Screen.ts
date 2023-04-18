import { ClassFile } from "./Storage/ClassFile";
import { ScreenInfo } from "./Storage/ScreenInfo";
import { View } from "../View";

export abstract class Screen<S extends ScreenInfo> {
  protected name: string;
  protected width: number;
  protected height: number;

  constructor(info: S) {
    this.name = info.name || "index";
    this.width = info.width || 600;
    this.height = info.height || 600;
    this.init(info);
  }

  protected init(info: S) {
    throw Error("method is not implemented.");
  }

  apply(view: View<any, any> & ClassFile) {
    throw Error("method is not implemented.");
  }

  create() {
    throw Error("method is not implemented.");
  }
}
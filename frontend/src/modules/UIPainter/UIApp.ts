import { View, ClassFile, ScreenInfo, ViewData } from "./Storage";
import { existsSync, mkdirSync } from "fs";

export abstract class UIApp<V extends View<ViewData, any>> {
  protected rootdir: string;

  constructor(rootdir: string) {
    try {
      this.rootdir = rootdir;
      if (!existsSync(rootdir))
        mkdirSync(rootdir);
    } 
    catch (err) {
      throw err;
    }
  }

  addScreen(info: ScreenInfo, views: Array<V & ClassFile>) {
    throw Error("method is not implemented.");
  }

  start(callback: Function) {
    throw Error("method is not implemented.");
  }

  close(callback: Function) {
    throw Error("method is not implemented.");
  }
}

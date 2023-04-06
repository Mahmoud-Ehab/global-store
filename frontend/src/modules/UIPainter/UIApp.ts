import { View, ClassFile, ScreenInfo } from "./Storage";
import { PathResolver } from "./PathResolver";
import { existsSync, mkdirSync } from "fs";

export abstract class UIApp {
  protected rootdir: string = "";
  protected resolver: PathResolver;

  constructor(rootdir: string, resolver: PathResolver) {
    try {
      this.resolver = resolver;
      this.rootdir = this.resolver.normalize(rootdir);
      if (!existsSync(this.rootdir))
        mkdirSync(this.rootdir);
    } 
    catch (err) {
      throw err;
    }
  }

  addScreen(info: ScreenInfo, views: Array<View & ClassFile>) {
    throw Error("method is not implemented.");
  }

  start(callback: Function) {
    throw Error("method is not implemented.");
  }

  close(callback: Function) {
    throw Error("method is not implemented.");
  }
}

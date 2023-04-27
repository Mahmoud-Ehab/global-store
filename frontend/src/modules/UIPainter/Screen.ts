import { View } from "./View";

export abstract class Screen<S extends object> {
  protected name: string;

  constructor(name: string, info: S) {
    this.name = name;
    this.init(info);
  }

  protected init(info: S) {
    throw Error("method is not implemented.");
  }

  addView(view: View<any, any>) {
    throw Error("method is not implemented.");
  }

  create() {
    throw Error("method is not implemented.");
  }
}
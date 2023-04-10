import { ClassFile } from "../../modules/UIPainter/Storage";
import { HTMLView } from "../HTMLView";
import { ContainerDrawer } from "../drawers/ContainerDrawer";

export class HomePage extends HTMLView implements ClassFile {
  constructor() {
    super(
      {id: "home", parentId: "root", text: ""}, 
      {width: "100%", height: "100%", backgroundColor: "#132321"}, 
      new ContainerDrawer()
    );
  }
  
  getFilePath(): string {
    // return the file path that shall be used after compilation
    return "./views/HomePage.js";
  }
  
  getClassName(): string {
    return "HomePage";
  }
}
import { ClassFile } from "../../modules/UIPainter/Storage";
import { HTMLView } from "../HTMLView";
import { ContainerDrawer } from "../drawers/ContainerDrawer";

export class HomePage extends HTMLView implements ClassFile {
  constructor() {
    super(
      {id: "home", parentId: "root", text: ""}, 
      {width: "600px", height: "600px", backgroundColor: "#132321"}, 
      new ContainerDrawer()
    );
  }
  
  getFilePath(): string {
    return "./pages/HomePage.js";
  }
  
  getClassName(): string {
    return "HomePage";
  }
}
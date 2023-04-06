import { ClassFile } from "../../modules/UIPainter/Storage/ClassFile";
import { View } from "../../modules/UIPainter/Storage/View";

export class HomePage implements View, ClassFile {
  draw() {
    const root = document.getElementById("root");
    const label = document.createElement("label");
    label.innerText = "Hello World!"
    root.appendChild(label);
  }
  
  getFilePath(): string {
    return __filename;
  }
  
  getClassName(): string {
    return "HomePage";
  }
}
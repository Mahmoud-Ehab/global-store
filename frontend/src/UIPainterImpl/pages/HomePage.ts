import { ClassFile, View } from "../../modules/UIPainter/Storage";

export class HomePage extends View implements ClassFile {
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
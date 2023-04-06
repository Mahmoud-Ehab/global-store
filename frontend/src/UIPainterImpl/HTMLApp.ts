import { Server } from "https";
import { UIApp } from "../modules/UIPainter/UIApp";
import { ClassFile } from "../modules/UIPainter/Storage/ClassFile";
import { View } from "../modules/UIPainter/Storage/View";
import { HTMLScreen } from "./HTMLScreen";
import { HTMLScreenInfo } from "./HTMLScreenInfo";

const handler = require('serve-handler');
const http = require('http');

export class HTMLApp extends UIApp {
  private server: Server;

  addScreen(info: HTMLScreenInfo, views: Array<View & ClassFile>): void {
    const screen = new HTMLScreen(info);
    screen.setAppRootDir(this.rootdir);
    screen.setResolver(this.resolver);

    for (let view of views)
      screen.apply(view);

    screen.create();
  }

  start(callback: Function): void {
    const port = 3000;
    const host = 'localhost';

    this.server = http.createServer((req: any, res: any) => {
      return handler(req, res, {
        public: this.rootdir,
        directoryListing: false
      })
    });
    
    this.server.listen(
      port, 
      host, 
      callback(port, host)
    );
  }

  close(callback: Function): void {
    this.server.close(callback());
  }
}
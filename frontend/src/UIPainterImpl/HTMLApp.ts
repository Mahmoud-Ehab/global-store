import handler from 'serve-handler';
import { Server, createServer } from 'http';

import { UIApp } from "../modules/UIPainter/UIApp";
import { ClassFile } from "../modules/UIPainter/Storage";

import { HTMLScreen } from "./HTMLScreen";
import { HTMLView } from "./HTMLView";

export class HTMLApp extends UIApp<HTMLView> {
  private server: Server;

  addScreen(screen: HTMLScreen, views: Array<HTMLView & ClassFile>): void {
    screen.setRootDir(this.rootdir);

    for (let view of views)
      screen.apply(view);

    screen.create();
  }

  start(callback: Function): void {
    const port = 3000;
    const host = 'localhost';

    this.server = createServer((req: any, res: any) => {
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
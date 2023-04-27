import handler from 'serve-handler';
import { Server, createServer } from 'http';
import { existsSync, mkdirSync } from 'fs';

import { UIApp } from "../modules/UIPainter/UIApp";
import { HTMLScreen } from "./HTMLScreen";

export class HTMLApp implements UIApp<HTMLScreen> {
  private server: Server;
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

  addScreen(screen: HTMLScreen): void {
    screen.setRootDir(this.rootdir);
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
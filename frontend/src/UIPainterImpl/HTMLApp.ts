import handler from 'serve-handler';
import { Server, createServer } from 'http';
import { existsSync, mkdirSync } from 'fs';

import { UIApp } from "../modules/UIPainter/UIApp";
import { HTMLScreen } from "./HTMLScreen";

export class HTMLApp implements UIApp<HTMLScreen> {
  private server: Server;
  private host: string;
  private port: number;
  protected rootdir: string;

  constructor(rootdir: string, host?: string, port?: number) {
    try {
      this.host = host || "127.0.0.1";
      this.port = port || 3000;
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
    this.server = createServer((req: any, res: any) => {
      return handler(req, res, {
        public: this.rootdir,
        directoryListing: false
      })
    });
    
    this.server.listen(
      this.port, 
      this.host, 
      callback(this.port, this.host)
    );
  }

  close(callback: Function): void {
    this.server.close(callback());
  }
}
import express = require("express");
import { ServerApp } from "../_modules/Server/Storages";
import { ExpressRouter } from "./ExpressRouter";

export class ExpressApp implements ServerApp {
  private app: express.Application;
  private appListener: any;

  constructor() {
    this.app = express();
  }

  getExpressApp() {
    return this.app;
  }

  use(routername: string, router: ExpressRouter) {
    this.app.use(`/${routername}`, router.getExpressRouter());
  }

  listen(port: number, host: string, callback: () => void) {
    this.appListener = this.app.listen(port, host, callback);
  }

  close(callback: Function) {
    this.appListener.close(callback);
  }
}
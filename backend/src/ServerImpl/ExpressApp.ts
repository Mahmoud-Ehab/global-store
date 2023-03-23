import express = require("express");
import { ServerApp } from "../_modules/Server/Storages";
import { ExpressRouter } from "./ExpressRouter";

export class ExpressApp implements ServerApp {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  listen(port: number, host: string, callback: () => void) {
    this.app.listen(port, host, callback);
  }

  use(routername: string, router: ExpressRouter) {
    this.app.use(`/${routername}`, router.getExpressRouter());
  }

  getExpressApp() {
    return this.app;
  }
}
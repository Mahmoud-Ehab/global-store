import express = require("express");
import bodyParser = require("body-parser");
import { Server } from "../_modules/Server/Server";

export class ExpressServer extends Server {
  private appListener: any;

  constructor(host: string, port: number) {
    super(express(), host, port);
  }

  start() {
    // third-party middlewares
    (this.app as express.Application).use(bodyParser.json());

    // router-level middlewares
    this.loadRouters();

    // application-level middlewares
    (this.app as express.Application).get('/', (_req, _res) => {
      _res.send("Hello world");
    });

    // error-handling middlewares
    (this.app as express.Application).use((err: any, req: any, res: any, next: any) => {
      if (err.code <= 510)
        res.status(err.code).json(err);
      else {
        res.status(500).json({code: 500, message: "Internal error."});
      }
    });

    // start the server
    this.appListener = (this.app as express.Application).listen(this.port, this.host, () => {
      console.log(`Example app is hosting on http://localhost:${this.port}`);
    })
  }

  close(callback: Function) {
    if (this.appListener)
      this.appListener.close(callback);
  }
}

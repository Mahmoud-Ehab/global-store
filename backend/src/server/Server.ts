import express = require("express");
import bodyParser = require("body-parser");
import { RouterInitializer } from "./RouterInitializer/RouterInitializer";

class Server {
  private expressApp: express.Application;
  private routersFactories: Array<RouterInitializer>;
  private appListener: any;

  private host: string;
  private port: number;

  constructor(host: string, port: number) {
    this.expressApp = express();
    this.routersFactories = [];
    this.host = host;
    this.port = port;
  }

  start() {
    // third-party middlewares
    this.expressApp.use(bodyParser.json());

    // router-level middlewares
    this.loadRouters();

    // application-level middlewares
    this.expressApp.get('/', (_req, _res) => {
      _res.send("Hello world");
    });

    // error-handling middlewares
    this.expressApp.use((err: any, req: any, res: any, next: any) => {
      if (err.code <= 510)
        res.status(err.code).json(err);
      else {
        res.status(500).json({code: 500, message: "Internal error."});
      }
    });

    // start the server
    this.appListener = this.expressApp.listen(this.port, this.host, () => {
      console.log(`Example app is hosting on http://localhost:${this.port}`);
    })
  }

  close(callback: Function) {
    if (this.appListener)
      this.appListener.close(callback);
  }

  addRouter(router: RouterInitializer) {
    this.routersFactories.push(router);
  }

  private loadRouters() {
    this.routersFactories.forEach(routerFactory => {
      routerFactory.init();
      this.expressApp.use(`/${routerFactory.routerName}`, routerFactory.router);
    })
  }
}

export default Server;
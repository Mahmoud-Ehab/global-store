import express = require("express");
import RouterFactoryInterface from "./RouterFactory/RouterFactoryInterface";

class Server {
  private expressApp: express.Application;
  private routersFactories: Array<RouterFactoryInterface>;
  private appListener: any;

  constructor() {
    this.expressApp = express();
    this.routersFactories = [];
  }

  start() {
    // init route endpoint
    this.expressApp.get('/', (_req, _res) => {
      _res.send("Hello world");
    });

    // load the routers
    this.loadRouters();

    // define an error handler middleware
    this.expressApp.use((err: any, req: any, res: any, next: any) => {
      console.log(err.stack);
      res.status(500).send({ error: err.message });
    });

    this.appListener = this.expressApp.listen(5000, () => {
      console.log(`Example app is hosting on http://localhost:${5000}`);
    })
  }

  close(callback: Function) {
    if (this.appListener)
      this.appListener.close(callback);
  }

  addRouter(router: RouterFactoryInterface) {
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
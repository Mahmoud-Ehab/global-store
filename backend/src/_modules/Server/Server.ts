import { RouterInitializer } from "./RouterInitializer";
import { ServerApp } from "./Storages/ServerApp";

export abstract class Server {
  protected app: ServerApp;
  protected host: string;
  protected port: number;
  private routersInitializers: Array<RouterInitializer>;

  constructor(app: ServerApp, host: string, port: number) {
    this.app = app;
    this.host = host;
    this.port = port;
    this.routersInitializers = [];
  }

  start() {
    throw Error("method is not implemented");
  }

  close(callback: Function) {
    throw Error("method is not implemented");
  }

  addRouter(router: RouterInitializer) {
    this.routersInitializers.push(router);
  }

  // shall be used in start method implementations
  protected loadRouters() {
    this.routersInitializers.forEach(routerInitializer => {
      routerInitializer.init();
      this.app.use(routerInitializer.routerName, routerInitializer.router);
    })
  }
}

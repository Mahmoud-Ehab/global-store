import { RouterInitializer } from "./RouterInitializer";
import { ServerApp } from "./Storage/ServerApp";

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
    this.loadRouters();
    this.app.listen(this.port, this.host, () => {
      console.log(`Example app is hosting on http://localhost:${this.port}`);
    })
  }

  close(callback: Function) {
    if (this.app)
      this.app.close(callback);
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

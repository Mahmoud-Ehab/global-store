import bodyParser = require("body-parser");
import { Server } from "../_modules/Server/Server";
import { ExpressApp } from "./ExpressApp";

export class ExpressServer extends Server {
  private appListener: any;

  constructor(host: string, port: number) {
    super(new ExpressApp(), host, port);
  }

  start() {
    // third-party middlewares
    (this.app as ExpressApp).getExpressApp().use(bodyParser.json());

    // router-level middlewares
    this.loadRouters();

    // application-level middlewares
    (this.app as ExpressApp).getExpressApp().get('/', (_req, _res) => {
      _res.send("Hello world");
    });

    // error-handling middlewares
    (this.app as ExpressApp)
    .getExpressApp().use((err: any, req: any, res: any, next: any) => {
      if (err.code <= 510)
        res.status(err.code).json(err);
      else {
        res.status(500).json({code: 500, message: "Internal error."});
      }
    });

    // start the server
    this.appListener = (this.app as ExpressApp)
    .getExpressApp()
    .listen(this.port, this.host, () => {
      console.log(`Example app is hosting on http://localhost:${this.port}`);
    })
  }

  close(callback: Function) {
    if (this.appListener)
      this.appListener.close(callback);
  }
}

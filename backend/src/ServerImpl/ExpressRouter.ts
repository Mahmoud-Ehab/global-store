import express = require("express");
import { Endpoint, Router } from "../_modules/Server/Storages";
import { ExpressHandler } from "./ExpressHandler";

export class ExpressRouter implements Router {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  define(endpoint: Endpoint, handler: ExpressHandler) {
    this[endpoint.type]()(
      endpoint.appPath, 
      (req: express.Request, res: express.Response) => {
        handler.initExpressVars(res);
        if (req.body["request_name"]) {
          handler.handle(req);
        }
        else
          handler.error({
            code: 400, 
            message: "Bad Request: request_name is missing."
          });
      }
    );
  }

  getExpressRouter() {
    return this.router;
  }

  private GET() {
    return this.router.get.bind(this.router);
  }

  private POST() {
    return this.router.post.bind(this.router);
  }

  private PATCH() {
    return this.router.patch.bind(this.router);
  }

  private DELETE() {
    return this.router.delete.bind(this.router);
  }
}
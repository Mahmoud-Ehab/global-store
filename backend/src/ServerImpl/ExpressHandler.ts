import express = require("express");
import { Handler, Response } from "../_modules/Server/Storage";

export abstract class ExpressHandler extends Handler {
  private res: express.Response;

  initExpressVars(res: express.Response) {
    this.res = res;
  }

  send(response: Response) {
    this.res.json(response);
  }

  error(e: {code: number, message: string}) {
    this.res.status(e.code).end(e.message);
  }

  protected hasUndefined(...objs: any) {
    for (const obj of objs) {
      for (const key in obj)
        if (obj[key] === undefined)
          return true;
    }
    return false;
  }
}

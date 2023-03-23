import express = require("express");
import { Handler } from "../_modules/Server/Types/Handler";
import { Response } from "../_modules/Server/Types";

export abstract class ExpressHandler extends Handler {
  private res: express.Response;

  initExpressVars(res: express.Response) {
    this.res = res;
  }

  send(response: Response) {
    this.res.json(response);
  }

  error(e: {code: number, message: string}) {
    this.res.status(e.code).json(e);
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

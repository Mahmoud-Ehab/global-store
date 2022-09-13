import express = require("express");
import { RouterInitializer } from "./RouterInitializer";
import { Endpoint } from "../Endpoints/type";
import QueryManager from "../../database/QueryManager/QueryManager";

export abstract class RouterInitializerImp implements RouterInitializer {
  private _router: express.Router;

  protected queryManager: QueryManager;
  protected _routerName: string;

  constructor(qm: QueryManager) {
    this._router = express.Router();
    this.queryManager = qm;
  }

  get router(): express.Router {
    return this._router;
  }

  get routerName(): string {
    return this._routerName;
  }

  init(): void {
    throw new Error("Method not implemented.");
  }

  protected get(endpoint: Endpoint, ...handlers: Array<express.Handler>) {
    this._router.get(endpoint.expressPath, ...handlers);
  }

  protected post(endpoint: Endpoint, ...handlers: Array<express.Handler>) {
    this._router.post(endpoint.expressPath, ...handlers);
  }

  protected delete(endpoint: Endpoint, ...handlers: express.Handler[]): void {
    this._router.delete(endpoint.expressPath, ...handlers);
  }

  protected patch(endpoint: Endpoint, ...handlers: express.Handler[]): void {
    this._router.patch(endpoint.expressPath, ...handlers);
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

import express = require("express");
import RouterFactoryInterface from "./RouterFactoryInterface";
import { Endpoint } from "../Endpoints/type";
import QueryManagerInterface from "../../database/QueryManager/QueryManagerInterface";

abstract class RouterFactory implements RouterFactoryInterface {
  private _router: express.Router;

  protected queryManager: QueryManagerInterface;
  protected _routerName: string;

  constructor(qm: QueryManagerInterface) {
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

  get(endpoint: Endpoint, ...handlers: Array<express.Handler>) {
    this._router.get(endpoint.expressPath, ...handlers);
  }

  post(endpoint: Endpoint, ...handlers: Array<express.Handler>) {
    this._router.post(endpoint.expressPath, ...handlers);
  }

  delete(endpoint: Endpoint, ...handlers: express.Handler[]): void {
    this._router.delete(endpoint.expressPath, ...handlers);
  }

  patch(endpoint: Endpoint, ...handlers: express.Handler[]): void {
    this._router.patch(endpoint.expressPath, ...handlers);
  }

  protected auth(data: any, credentials: any) {
    for (const key in credentials) {
      if (credentials[key] !== data[key])
        return false;
    }
    return true;
  }

  protected hasUndefined(...objs: any) {
    for (const obj of objs) {
      for (const key in obj)
        if (obj[key] === undefined)
          return true;
    }
    return false;
  }

  private cloneEndpoints(_endpoints: Array<Endpoint>): Array<Endpoint> {
    const clonned: Array<Endpoint> = [];
    _endpoints.forEach(ep => clonned.push({...ep}));
    return clonned;
  }
}

export default RouterFactory;
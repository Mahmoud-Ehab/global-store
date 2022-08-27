import express = require("express");
import RouterFactoryInterface from "./RouterFactoryInterface";
import Endpoint from "../Endpoints/EndpointType";
import QueryManagerInterface from "../../database/QueryManager/QueryManagerInterface";

abstract class RouterFactory implements RouterFactoryInterface {
  private _router: express.Router;
  private _endpoints: Array<Endpoint>;

  protected queryManager: QueryManagerInterface;
  protected _routerName: string;

  constructor(qm: QueryManagerInterface) {
    this._router = express.Router();
    this.queryManager = qm;
    this._endpoints = [];
  }

  get router(): express.Router {
    return this._router;
  }

  get routerName(): string {
    return this._routerName;
  }

  get endpoints(): Array<Endpoint> {
    return this.cloneEndpoints(this._endpoints);
  }

  init(): void {
    throw new Error("Method not implemented.");
  }

  get(path: string, ...handlers: Array<express.Handler>) {
    this._endpoints.push({text: path, type: 'GET'});
    this._router.get(path, ...handlers);
  }

  post(path: string, ...handlers: Array<express.Handler>) {
    this._endpoints.push({text: path, type: 'POST'});
    this._router.post(path, ...handlers);
  }

  delete(path: string, ...handlers: express.Handler[]): void {
    this._endpoints.push({text: path, type: 'DELETE'});
    this._router.delete(path, ...handlers);
  }

  patch(path: string, ...handlers: express.Handler[]): void {
    this._endpoints.push({text: path, type: 'PATCH'});
    this._router.patch(path, ...handlers);
  }

  protected auth(data: any, credentials: any) {
    for (const key of Object.keys(credentials)) {
      if (credentials[key] !== data[key])
        return false;
    }
    return true;
  }

  private cloneEndpoints(_endpoints: Array<Endpoint>): Array<Endpoint> {
    const clonned: Array<Endpoint> = [];
    _endpoints.forEach(ep => clonned.push({...ep}));
    return clonned;
  }
}

export default RouterFactory;
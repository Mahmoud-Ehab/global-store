import express = require("express");
import RouterFactoryInterface from "./RouterFactoryInterface";
import Endpoint from "../Endpoints/EndpointType";

abstract class RouterFactory implements RouterFactoryInterface {
  private _router: express.Router;
  private _endpoints: Array<Endpoint>;

  constructor() {
    this._router = express.Router();
    this._endpoints = [];
  }

  get router(): express.Router {
    return this._router;
  }

  get endpoints(): Array<Endpoint> {
    return this.clone(this._endpoints);
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

  private clone(_endpoints: Array<Endpoint>): Array<Endpoint> {
    const clonned: Array<Endpoint> = [];
    _endpoints.forEach(ep => clonned.push({...ep}));
    return clonned;
  }
}

export default RouterFactory;
import express = require("express");
import Endpoint from "../Endpoints/EndpointType";

interface RouterFactory {
  get router(): express.Router;
  get routerName(): string;
  get endpoints(): Array<Endpoint>;
  init(): void;
  get(path: string, ...handlers: Array<express.Handler>): void;
  post(path: string, ...handlers: Array<express.Handler>): void;
  delete(path: string, ...handlers: Array<express.Handler>): void;
  patch(path: string, ...handlers: Array<express.Handler>): void;
}

export default RouterFactory;
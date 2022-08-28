import express = require("express");
import { Endpoint } from "../Endpoints/type";

interface RouterFactory {
  get router(): express.Router;
  get routerName(): string;

  init(): void;
  get(endpoint: Endpoint, ...handlers: Array<express.Handler>): void;
  post(endpoint: Endpoint, ...handlers: Array<express.Handler>): void;
  delete(endpoint: Endpoint, ...handlers: Array<express.Handler>): void;
  patch(endpoint: Endpoint, ...handlers: Array<express.Handler>): void;
}

export default RouterFactory;
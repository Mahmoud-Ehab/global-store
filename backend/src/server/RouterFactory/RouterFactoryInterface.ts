import express = require("express");
import Endpoint from "../Endpoints/EndpointType";

interface RouterFactory {
  get router(): express.Router;
  get endpoints(): Array<Endpoint>;
  init(): void;
  get(path: string, ...handlers: Array<express.Handler>): void;
  post(path: string, ...handlers: Array<express.Handler>): void;
}

export default RouterFactory;
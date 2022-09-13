import express = require("express");

export interface RouterInitializer {
  get router(): express.Router;
  get routerName(): string;
  init(): void;
}

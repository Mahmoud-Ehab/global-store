"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerImpl_1 = require("../dist/ServerImpl");
var DatabaseImpl_1 = require("../dist/DatabaseImpl");
var ExpressRouterInitializers_1 = require("../dist/ServerImpl/ExpressRouterInitializers");
var server = new ServerImpl_1.ExpressServer("localhost", 5000);
var queryManager = new DatabaseImpl_1.PostgresQueryManager();
var userRF = new ExpressRouterInitializers_1.UserRouterInitializer(queryManager);
var pubRF = new ExpressRouterInitializers_1.PublicationRouterInitializer(queryManager);
var reviewRF = new ExpressRouterInitializers_1.ReviewRouterInitializer(queryManager);
server.addRouter(userRF);
server.addRouter(pubRF);
server.addRouter(reviewRF);

exports.mochaGlobalSetup = async function () {
  server.start();
};

exports.mochaGlobalTeardown = async function () {
  server.close(function () {
    console.log("server has been gracefully shutdowned.");
  });
};
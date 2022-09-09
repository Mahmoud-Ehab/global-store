"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryManagerImp_1 = require("../dist/database/QueryManager/QueryManagerImp");
var Server_1 = require("../dist/server/Server");
var UserRouterFactory_1 = require("../dist/server/RouterFactory/factories/UserRouterFactory");
var PublicationRouterFactory_1 = require("../dist/server/RouterFactory/factories/PublicationRouterFactory");
var ReviewRouterFactory_1 = require("../dist/server/RouterFactory/factories/ReviewRouterFactory");

var server = new Server_1.default("localhost", 5000);
var queryManager = new QueryManagerImp_1.default();

var userRF = new UserRouterFactory_1.default(queryManager);
var pubRF = new PublicationRouterFactory_1.default(queryManager);
var reviewRF = new ReviewRouterFactory_1.default(queryManager);

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
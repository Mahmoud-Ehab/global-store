"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryManagerImp_1 = require("../dist/database/QueryManager/QueryManagerImp");
var Server_1 = require("../dist/server/Server");
var UserRouterInitializer_1 = require("../dist/server/RouterInitializer/Initializers/UserRouterInitializer");
var PublicationRouterInitializer_1 = require("../dist/server/RouterInitializer/Initializers/PublicationRouterInitializer");
var ReviewRouterInitializer_1 = require("../dist/server/RouterInitializer/Initializers/ReviewRouterInitializer");

var server = new Server_1.default("localhost", 5000);
var queryManager = new QueryManagerImp_1.default();

var userRF = new UserRouterInitializer_1.UserRouterInitializer(queryManager);
var pubRF = new PublicationRouterInitializer_1.PublicationRouterInitializer(queryManager);
var reviewRF = new ReviewRouterInitializer_1.ReviewRouterInitializer(queryManager);

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
import QueryManager from './database/QueryManager/QueryManager'
import Server from './server/Server';

import UserRouterFactory from './server/RouterFactory/factories/UserRouterFactory';

const queryManager = new QueryManager();
const userRF = new UserRouterFactory(queryManager);
const server = new Server();

server.addRouter(userRF);
server.start();

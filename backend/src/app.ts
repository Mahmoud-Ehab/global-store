import QueryManager from './database/QueryManager/QueryManager'
import Server from './server/Server';

import UserRouterFactory from './server/RouterFactory/factories/UserRouterFactory';

const server = new Server();
const queryManager = new QueryManager();
const userRF = new UserRouterFactory(queryManager);

server.addRouter(userRF);

server.start();

process.on('SIGTERM', () => {
	server.close(() => {
		console.log("server has been gracefully shutdowned.");
	});
});

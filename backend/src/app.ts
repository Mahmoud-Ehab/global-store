import QueryManager from './database/QueryManager/QueryManager'
import Server from './server/Server';

import UserRouterFactory from './server/RouterFactory/factories/UserRouterFactory';
import PublicationRouterFactory from './server/RouterFactory/factories/PublicationRouterFactory';

const server = new Server("localhost", 5000);
const queryManager = new QueryManager();
const userRF = new UserRouterFactory(queryManager);
const pubRF = new PublicationRouterFactory(queryManager);

server.addRouter(userRF);
server.addRouter(pubRF);
server.start();

process.on('SIGTERM', () => {
	server.close(() => {
		console.log("server has been gracefully shutdowned.");
	});
});

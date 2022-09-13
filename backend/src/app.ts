import QueryManagerImp from './database/QueryManager/QueryManagerImp'
import Server from './server/Server';

import UserRouterFactory from './server/RouterInitializer/factories/UserRouterFactory';
import PublicationRouterFactory from './server/RouterInitializer/factories/PublicationRouterFactory';
import ReviewRouterFactory from './server/RouterInitializer/factories/ReviewRouterFactory';

const server = new Server("localhost", 5000);
const queryManager = new QueryManagerImp();

const userRF = new UserRouterFactory(queryManager);
const pubRF = new PublicationRouterFactory(queryManager);
const reviewRF = new ReviewRouterFactory(queryManager);

server.addRouter(userRF);
server.addRouter(pubRF);
server.addRouter(reviewRF);
server.start();

process.on('SIGTERM', () => {
	server.close(() => {
		console.log("server has been gracefully shutdowned.");
	});
});

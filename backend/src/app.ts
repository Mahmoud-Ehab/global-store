import QueryManagerImp from './database/QueryManager/QueryManagerImp'
import Server from './server/Server';

import { UserRouterInitializer } from './server/RouterInitializer/Initializers/UserRouterInitializer';
import { PublicationRouterInitializer } from './server/RouterInitializer/Initializers/PublicationRouterInitializer';
import { ReviewRouterInitializer } from './server/RouterInitializer/Initializers/ReviewRouterInitializer';

const server = new Server("localhost", 5000);
const queryManager = new QueryManagerImp();

const userRF = new UserRouterInitializer(queryManager);
const pubRF = new PublicationRouterInitializer(queryManager);
const reviewRF = new ReviewRouterInitializer(queryManager);

server.addRouter(userRF);
server.addRouter(pubRF);
server.addRouter(reviewRF);
server.start();

process.on('SIGTERM', () => {
	server.close(() => {
		console.log("server has been gracefully shutdowned.");
	});
});

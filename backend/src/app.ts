import { ExpressServer } from './ServerImpl';
import { QueryManager } from './DatabaseImpl';
import { 
	UserRouterInitializer,
	PublicationRouterInitializer,
	ReviewRouterInitializer
} from './ServerImpl/ExpressRouterInitializers';

const server = new ExpressServer("localhost", 5000);
const queryManager = new QueryManager();

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

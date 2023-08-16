import { Server } from './ServerImpl';
import { QueryManager } from './DatabaseImpl';
import { 
	UserRouterInitializer,
	PublicationRouterInitializer,
	ReviewRouterInitializer
} from './ServerImpl/ExpressRouterInitializers';

const server = new Server("localhost", 5000);
const queryManager = new QueryManager({
	host: 'localhost',
	port: 5432,
	database: 'globalstore',
	user: 'postgres',
	password: 'postgres',
});

const userRI = new UserRouterInitializer(queryManager);
const pubRI = new PublicationRouterInitializer(queryManager);
const reviewRI = new ReviewRouterInitializer(queryManager);

server.addRouter(userRI);
server.addRouter(pubRI);
server.addRouter(reviewRI);
server.start();

process.on('SIGTERM', () => {
	server.close(() => {
		console.log("server has been gracefully shutdowned.");
	});
});

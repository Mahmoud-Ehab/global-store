# Get Started

## NPM install
Install the dependencies by executing the following command in the root directory:
```
npm install
```

## NPM run build
This would just use the `tsc` command (TypeScript Compiler) and the `tsconfig.json` file in the root directory, in order to compile the files from `src` into JavaScript and relocate them in `dist` directory.
```
npm run build
```

## NPM run start
This command could only be used right after building. It executes `app.js` from `dist` directory via node.
```
npm run start
```


# Overview of The Structure

If you're only interested in running the app, then skip ahead to [NPM commands section](#NPM-commands).

## Database Component
Two major components of the backend development are: Database & Server. The database contains sql queries for initializing PostgreSQL Server, and the overall functionalities for communicating with the server via JS. It's worth mentioning that the database component considered having application's business rules (interfaces, types and abstracts).

> Each controller has acquantance relationship with a relative type (user, publication or review). Not illustrated in the diagram, however, for more simplicity in modeling the system.

![database diagram](./docs/diagrams/database-diagram.svg)

## Server Component
The server is just composed of express routers; it completely coupled to express framework, therefore it's considered as the lowest-level in the backend design and it has dependency on the database component.

![server diagram](./docs/diagrams/server-diagram.svg)

## Directory Structure

the structure of "src" directory may be visualized as follow:
```md
src
|   app.ts
|
|-database
|   |
|   |--DataController
|   |   |   DataController.ts
|   |   |   DataControllerInterface.ts
|   |   |
|   |   |---controllers
|   |   |   |   UsersController.ts
|   |   |   |   PublicationsController.ts
|   |   |   |   ReviewsController.ts
|   |   |   |
|   |   |
|   |   |---types
|   |   |   |   Publication.ts
|   |   |   |   Review.ts
|   |   |   |   User.ts
|   |   |
|   |
|   |--DataDriver
|   |   |   DataDriver.ts
|   |   |   DataDriverInterface.ts
|   |   |   
|   |
|   |--postgresql
|   |   |   initRelations.sql
|   |   |   ...
|   |   |   
|   |
|   |--Queries
|   |   |   Queries.ts
|   |   |   QueriesInterface.ts
|   |   |
|
|-server
    |   Server.ts
    |   ...

```

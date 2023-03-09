> last update on September 14, 2022

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
This command could only be used right after building. 
It executes `app.js` from `dist` directory via node.
```
npm run start
```

## NPM run test
This command could only be used right after building and installing dev dependencies. 
It tests server routers components by using mocha framework and axios.
```
npm run test
```

# Overview of The Structure

There are only two major components of the backend side: _Database_ & _Server_, each of which is located in a separete sub-directory of the backend. 

The _Database_ considered to possess the business rules of the system, that represent the overall concept behind the system: _DataContollers_ and _QueryGenerator_. The former is used to encapsulate the operations of sending queries to the Database Client. However, the latter is to avoid hard-coding the SQL queries. In addition, the component provides a full-organized and managed facility to use and access its all operations via _QueryManager_.

On the other hand, the _Server_ is a detail. It tightly coupled to Express's architecture and has dependency on the _Database_, however, it has RouterInitializer design that aquires the component some flexibility. Loosely speaking, if some other framework is intended to be used rather than Express, minor modifications in a few functions of _RouterInitializer Abstract Class_ are supposed to be the only repercussions.

## Database Component
The _Dababase_ component is composed of three objects/collections of objects (building blocks). Each object/collection is distinguished by its level of abstraction and stability. They might be listed according to the levels, descentantly, as follows:

1. DataController & QueryGenerator 
2. DataControllerImp & QueryGeneratorImp
3. QueryManager & QueryManagerImp

_QueryGenerator_ and _DataController_ are the most stable objects in the system, they shall change only after changing the requirements. On the other hand, _DataControllerImp_ might change if the used database client (which is provided by postgres-node in our case) changed, for some reason. And _QueryGenerator_ is , as obvious, completely coupled to SQL. Meanly, it will need changes if we decided to use NoSQL in future for some reasone, or other DBMS.

Finally, _QueryManager_, the most instable object, whose only purpose is to provide the external environment with well-organised and managed facility to access all the _Database_ operations. Despite it gives the user access to client connection operations, it shall connect and disconnect the client automatically, when the user sends a query and when all queries are fulfilled, respectively.

> The component is totally coupled to postgres-node, as it explicitly uses its types objects and client. However it shall be decoupled by adding extra interfaces in future.

![database diagram](./docs/diagrams/database-diagram.svg)

## Server Component
The _Server_ component is much more simple, compared to the _Database_, in implementaion, however, it's more wordy to some extent. It consists of just two major elements, and another minor ones for the external environment. 

The _RouterInitializer_, as mentioned previously, is coupled to Express Architecture. However, it should be trivial to port it to another architecture, by few changes in the Abstract implementation. The _RouterInitializerImp_ has dependency on the _QueryManager_ of the _Database_, in order to be able to handle users requests which certainlly requires access to the database.

For sake of flexibility, maintainability, and most probably readability; the _RouterInitializerImp_ does not use the controllers of _QueryManager_ directly, rather it pass the _QueryManager_ to a third element (_QueriesStrategy_) that encapsulates some general combinations of different DataControllers methods which are probably used very often by all routers. Briefly, _QueriesStrategy_ just encapsulates a redundantly reusable algorithms; like getById(id), ifExists() "that one throws error 404 if not",... etc.

The _Server_ element is used by the external environment as a container for Express Application. The user of it shall be able to start a server with custom `host` and `port`, and load it with Routers. It encapsulates the necessary initialization for express application in `start` method (using different middlewares).

Finally, the _Endpoint_ purpose is to share the implemented endpoints by the routers with the frontend client. It facilitate sending requests, by encapsulating the path parameters and generate it with pre-defined functions.

![server diagram](./docs/diagrams/server-diagram.svg)

### QueriesStrategy.builder()

Despite the fact that, no much has been said about various objects of this component, the implementation of builder method cannot be overlooked and worth elaborating.

Typically, using QueriesStrategy along with QueryManager in RouterInitializer shall be in the following code style:

```
QueryManager
    .query(QueriesStrategy.retrieveQuery())
    .query(QueriesStrategy.checkQuery())
    .query(QueriesStrategy.send(callback))
    .execute()
```

QueriesStrategy generates some often used composition of (DataController) statements withing function block, then pass it to QueryManager which is responsible for executing them in some systematic manner. However, this is not all what QueriesStrategy does; as you may have noticed in the last query call, it's also responsible for creating the response payload object for server endpoints. And invoking the callback with the payload as its first parameter value.

QueriesStrategy.send method stores the last query result, returned from the other strategy methods, in the payload object - in 'data' attribute. In addition, send method provides another parameter in order to give more liberaty for users to choose which query returned value would be loaded in the response object (any returned result before the last one). `QueryManager.send(callback, index)`

Example:
```
QueryManager
    .query(userStrategy.getById("us1234"))
    .query(userStrategy.ifExists())
    .query(userStrategy.send(jsonOf(res)))
    .execute()
```
```
Payload: {
    code: 200,
    message: "query fulfilled."
    data: {
        id: "us1234",
        username: "user1",
        ...
    }
}
```

In some cases, more complex payload structure may be required; and here the role of builder method comes in.
For instance, if you want get a specific review data with the user (reviewer) info attached to it in the response object, you shall use the builder to build up the response object. This senario could be implemented as follow:

```
QueryManager
//4 .query(user.getById(reqparams.userid))
//3 .query(user.ifExists())
//2 .query(review.getFilteredList({
        publication_id: reqparams.pubid, 
        user_id: reqparams.userid 
    }))
//1 .query(review.ifExists())
//0 .query(review.builder().getListItem(0))
    .query(review.builder().define("user", 4))
    .query(review.send(jsonOf(res)))
    .execute()
    .catch(e => next(e));
```

`builer().getListItem(index)` just re-return the last returned value or the first element of the last returned list, from a strategy-query-method. While `builder().define(string, index)` defines a new attribute in the last created (returned) object from the builder, and assigns a specified strategy-query-method returned value to it using an index (its second parameter).

> jsonOf is just an alternative for `res.json` to reserve its context.\
it's just a function that returns: `(payload: any) => res.json(payload)`.

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

# Overview

Any program can be considered as a store with one or more storages (subprograms) and at least one facility for each storage. Any subprogram, moreover, is a program itself; hath its own storages and facilites (a program can relatively be called storage or facilite for another). Storages can vary in properties: such as structures and types of elements, also, they can share facilities. A facility is an equipment that is used to retrieve, manipulate, or remove elements from storages. Speaking more technically, a program is an accumulation of algorithms and data structures, as the store is a collection of facilites and storages. This is the perception upon which each piece of the architecture will be designed.

To amplify the distinction between storages and facilities in technical sense, we shall define a storage as a subprogram, a set of classes, or as set of types (structures or interfaces), whereas a faclity is either a subprogram or a set of classes. A storage can be a subprogram in case it has high level of complexity which requires breaking it down, it can be a class whose methods will be delegated by facilites, or it can be just a type that will be used by facilites. Similary, a facility can be a subprogram, or a class that will either use the types of the storage or delegate some functionality to the classes thereof.

This component (the backend) is considered as the storage of the web application. It has only one storage along with its facility, which we shall call the "Database" and the "Server", respectively. Each of which, in turn, contains its own storages and facilities.

# The Database

The _Database_ represents the overall concept behind the system; as it should be only coupled to the business rules. It has one storage with two facilities; the storage is a set of three data types: _User_, _Publication_, and _Review_, whereas the facilities are _DataController_ and _QueryManager_.

_DataController_ is a low-level facility that will use each type of the storage to create, update, remove, and retrieve data. On the other hand, _QueryManager_ is a high-level facility in the sense that it uses _DataContoller_, and it provides a framework that users shall use, rather than _DataControllers_, to set the required queries (DataController methods) in a chain and excute them sequentially.

## DataController

_DataController_ is a subprogram with a type storage and class facility. To define a _DataController_, first we need to specify four underlying types:

1. QueryGenerator,
2. QueryConfig,
3. QueryHandler,
4. and QueryResult

_QueryGenerator_ is an interface declares a set of methods each of which generates a distinct _QueryConfig_. Whereas a _QueryConfig_ is a structure that specifies precisely a use case in a way that _QueryHandler_ can interpret. A _QueryHandler_, in turn, is a class with at least one method which takes _QueryConfig_ as input and produces _QueryResult_ as output. Last but not least, _QueryResult_ is a data type specifies the value that the user expect to get from queries.

Second, we shall define a class that uses the four types and employ them together to send queries more handily. It encapsulates the use of the storage (the four types), and provides users with a set of expressive methods, relieving the burden of knowing about the four types, that they should use rather than tediously employing the four types in order to accomplish a simple query.

## QueryManager

_QueryManager_ is a class facility that specifies the required _DataControllers_ for the user, by integrating the Database Storage (_User_, _Publication_, and _Review_ types) with _DataController_, along with methods to push queries in a queue, to excute them sequentially, and to retrieve queries results saved so far.

Pushing queries in a queue, then executing them all in order, can have many avails. In case we are using a SQL database, for instance, this would be significant to have; as it defines two points of time in which a connection can be established and breaked. A connection can be established after pushing the first query and can be breaked after the invocation of the last one. It also further the readability of the code; by writing it in the following form "QueryManager.query(UserController.get("userid"))" rather than a bunch of lines before and after the query to establish connection, initialize QueryHandler and DataControllers,...etc. Lastly, one of the major features of this approuch is that the results of queries can be saved in a stack which may be used ultimately to construct a convenient payload to be submitted to the user.

To save and retrieve queries results, we might simply define an array in this class and use it directly, or more elegantly we may define an inner class called _CarrierStack_. _CarrierStack_ has methods to store and retrieve elements, and to reset the stack. It behaves like a stack in storing elements; this is reckoned to be convenient as the last saved query result is likely to be the most required in the payload (taking over the burden of specifying an index). However, it behaves like an array in retrieving elements.

![database diagram](./docs/diagrams/database-diagram.svg)

# The Server

The _Server_ component is much more simple, compared to the _Database_, in implementaion, however, it's more wordy to some extent. It consists of just two major elements, and another minor ones for the external environment. 

The _RouterInitializer_, as mentioned previously, is coupled to Express Architecture. However, it should be trivial to port it to another architecture, by few changes in the Abstract implementation. The _RouterInitializerImp_ has dependency on the _QueryManager_ of the _Database_, in order to be able to handle users requests which certainlly requires access to the database.

For sake of flexibility, maintainability, and most probably readability; the _RouterInitializerImp_ does not use the controllers of _QueryManager_ directly, rather it pass the _QueryManager_ to a third element (_QueriesStrategy_) that encapsulates some general combinations of different DataControllers methods which are probably used very often by all routers. Briefly, _QueriesStrategy_ just encapsulates a redundantly reusable algorithms; like getById(id), ifExists() "that one throws error 404 if not",... etc.

The _Server_ element is used by the external environment as a container for Express Application. The user of it shall be able to start a server with custom `host` and `port`, and load it with Routers. It encapsulates the necessary initialization for express application in `start` method (using different middlewares).

Finally, the _Endpoint_ purpose is to share the implemented endpoints by the routers with the frontend client. It facilitate sending requests, by encapsulating the path parameters and generate it with pre-defined functions.

![server diagram](./docs/diagrams/server-diagram.svg)

## QueriesStrategy.builder()

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

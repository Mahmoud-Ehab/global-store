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

Any program can be considered as a store with one or more storage (subprograms) and at least one facility for each storage. Any subprogram, moreover, is a program itself; hath its own storage and facilities (a program can relatively be called storage or facility for another). Storage can vary in properties: such as structures and types of elements, also, they can share facilities. A facility is an equipment that is used to retrieve, manipulate, or remove elements from storage. Speaking more technically, a program is an accumulation of algorithms and data structures, as the store is a collection of facilities and storage. This is the perception upon which each piece of the architecture will be designed.

To amplify the distinction between storage and facilities in more technical sense, we shall define a storage as a subprogram, a set of classes, or a set of types (structures or interfaces), whereas a facility is either a subprogram or a set of classes. A storage can be a subprogram in case it has high level of complexity which requires breaking it down, it can be a class whose methods will be delegated by facilities, or it can be just a type that will be used by facilities. Similarly, a facility can be a subprogram, or a class that will either use the types of the storage, delegate some functionality to the classes thereof, or merely use other facilities. Facilities can be classified by their usage level of the storage; the more a facility uses storage elements, the lower it gets in level.

This component (the back-end) is considered as the storage of the web application. It has only one storage along with its facility, which we shall call the "Database" and the "Server", respectively. Each of which, in turn, contains its own storage and facilities.

# The Database

The _Database_ represents the overall concept behind the system; as it should be only coupled to the business rules. It has one storage with two facilities; the storage is merely a set of data types or structures that specify the properties of data units to be stored, whereas the facilities are _DataController_ and _QueryManager_.

_DataController_ is a low-level facility that shall use each type of the storage to create, update, remove, and retrieve data. On the other hand, _QueryManager_ is a high-level facility in the sense that it uses _DataContoller_, and it provides a framework that users shall use, rather than _DataControllers_, to set the required queries (DataController methods) in a chain and execute them sequentially.

## DataController

_DataController_ is a subprogram with a type storage and class facility. To define a _DataController_, first we need to specify four underlying types:

1. QueryGenerator,
2. QueryConfig,
3. QueryHandler,
4. and QueryResult

_QueryGenerator_ is an interface declares a set of methods each of which generates a distinct _QueryConfig_. Whereas a _QueryConfig_ is a structure that specifies precisely a use case in a way that _QueryHandler_ can interpret. A _QueryHandler_, in turn, is a class with at least one method which takes _QueryConfig_ as input and produces _QueryResult_ as output. Last but not least, _QueryResult_ is a data type specifies the value that the user expect to get from queries.

Second, we shall define a class that uses the four types and employ them together to send queries more handily. It encapsulates the use of the storage (the four types), and provides users with a set of expressive methods, relieving the burden of knowing about the four types, that they should use rather than tediously employing the four types in order to accomplish a simple query.

## QueryManager

_QueryManager_ is a class facility that specifies the required _DataControllers_ for the user, by integrating the Database Storage (_User_, _Publication_, and _Review_ types) with _DataController_, along with methods to push queries in a queue, to execute them sequentially, and to retrieve queries results saved so far.

Pushing queries in a queue, then executing them all in order, can have many avails. In case we are using a SQL database, for instance, this would be significant to have; as it defines two points of time in which a connection can be established and terminated. A connection can be established after pushing the first query and can be terminated after the invocation of the last one. It also further the readability of the code; by writing it in the following form "QueryManager.query(UserController.get("userid"))" rather than a bunch of lines before and after the query to establish connection, initialize QueryHandler and DataControllers,...etc. Lastly, one of the major features of this approach is that the results of queries can be saved in a stack which may be used ultimately to construct a convenient payload to be submitted to the user.

To save and retrieve queries results, we might simply define an array in this class and use it directly, or more elegantly we may define an inner class called _CarrierStack_. It has methods to store and retrieve elements, and to reset the stack. It behaves like a stack in storing elements; this is reckoned to be convenient as the last saved query result is likely to be the most required in the payload (assuming the index to be zero, while constructing the payload, will relieve the burden of specifying the index). However, it behaves like an array in retrieving elements, so the user can use the desired result directly without popping the above results.

![database diagram](./docs/diagrams/database-diagram.svg)

# The Server

As mentioned before, the server is the facility of the backend. And it is a subprogram with a set of types representing its storage along with a set of classes which shall, by using the types, establish together an HTTP server.

Essentially, there should exist an _app_ that involves a set of _routers_. Each _router_ defines a distinct set of _endpoints_. Whereas each _endpoint_ defines a path, where the user can send requests, and defines the type of the accepted requests. Moreover each _request_ is handled and a _response_ is sent by a _handler_. A type, a structure, or an interface shall be defined for each aforementioned item (the italicized words) — all together constitute the storage of the server.

Speaking with a little bit less level of abstraction, an _app_ object is responsible of adding routers and starting the server; _app.use_ and _app.listen_ methods shall get implemented by concrete objects. The _app.use(path, router)_ method specifies a path and associates it to a specific _router_ object, after using the required set of routers and associate each one to a specific path, the _app.litsen(port, host)_ method shall be called to start an HTTP server. A _router_ object is responsible for defining a set of _endpoints_, each of which is associated with a handler, by _router.define(endpoint, handler)_ method. A specific _handler_ is usually used for all endpoints of a corresponding _router_, the _router_ and the _handler_, in this case, are called "fully compatible". An _endpoint_ is just a structure with three attributes; the first is a function whereby users can construct a proper path while making requests, the other two are merely strings, one of them indicates the endpoint path for _router.define_ method, while the another indicates the type of the accepted _request_ by the corresponding endpoint. A _handler_ object is responsible for sending _responses_ to users, by different methods for different sorts of _responses_, after handling their requests by _handler.handle_ method. The _handler.handle(request)_ method either directly sends an error _response_ of "Bad Request", or indirectly sends a _response_ according to the _request_ payload by invoking another local method of the _handler_; it sends, directly, the error _response_ in case the _request_ body has no request_name attribute or there is no local method with the same name as the _request_, otherwise it invokes the corresponding local method and delegates to it the responsibility of sending the _response_.

On the other hand, there are only three classes each of which represents a facility. The lowest-level of them is called _QueryStrategy_ which depends on the _QueryManager_ from the database and the _Response_ type of the storage described above. Comes in the second place the _RouterInitializer_, it's considered as a middle-level facility, and it uses the _Handler_, the _Endpoint_, and the _Router_ elements from the storage. Lastly, the _Server_ is the high-level facility that uses the _RouterInitializer_ and the _ServerApp_ from the storage. We may distinguish between the facility of the backend and the facility of the server itself, by calling the former "server subprogram" or "the subprogram server" and the latter "server class" or "the class server".

![server diagram](./docs/diagrams/server-diagram.svg)

## QueryStrategy

This class facility is what connects the backend facility "the server" with the storage "the database". It's ought to be used by concrete _handler_ classes in defining their methods; the _handler_ delegates the use of _QueryManager_ and _DataControllers_ to _QueryStrategy_.

Each _QueryStrategy_ method should produce a value that's acceptable by the _QueryManager.query_ method as its parameter value. Moreover, each method produces a value that applies, conceptually, either "Retrieve Strategy", "Check Strategy", "Action Strategy", or "Response Strategy".

A function does apply a retrieve strategy if it only retrieves data from the database, by using _DataControllers_, and returns the value of the retrieved data. In case of an action strategy, the function adds, updates, or removes values from the database and returns nothing. Also in the remaining two strategies the function, usually, doesn't return values, however, it uses the _CarrierStack_ of the _QueryManager_. The _CarrierStack_ is used in check strategies to get access to the output of the last applied retrieve strategy, in order to apply a certain test (condition), which if it failed (is false) the function shall throw an error that _QueryManager.execute_ method catches and therefore terminates execution. On the other hand, a response strategy function uses the _CarrierStack_ to construct a payload, then it either returns it or sends it with _handler.send_ method.

### QueryStrategy.builder()

Despite the fact that, no much has been said about various objects of this component, the implementation of builder method cannot be overlooked and it worth elaborating.

Typically, using QueryStrategy along with QueryManager in Handler methods shall be in the following code style:

```
QueryManager
    .query(QueryStrategy.retrieveQuery())
    .query(QueryStrategy.checkQuery())
    .query(QueryStrategy.send(callback))
    .execute()
```

QueryStrategy generates some often used composition of (DataController) statements within function block, then pass it to QueryManager which is responsible for executing them in some systematic manner. However, this is not all what QueryStrategy does; as you may have noticed in the last query call, it's also responsible for creating the response payload object for server endpoints. And invoking the callback with the payload as its first parameter value.

QueryStrategy.send method stores the last query result, returned from the other strategy methods, in the payload object - in 'data' attribute. In addition, send method provides another parameter in order to give more liberty for users to choose which query returned value would be loaded in the response object (any returned result before the last one). `QueryManager.send(callback, index)`

Example:
```
QueryManager
    .query(userStrategy.getById("us1234"))
    .query(userStrategy.ifExists())
    .query(userStrategy.send(handler.send))
    .execute()
```
```
Payload: {
    code: 200,
    message: "query fulfilled.",
    data: {
        id: "us1234",
        username: "user1",
        ...
    }
}
```

In some cases, more complex payload structure may be required; and here the role of builder method comes in.
For instance, if you want get a specific review data with the user (reviewer) info attached to it in the response object, you shall use the builder to build up the response object. This scenario could be implemented as follow:

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
    .query(review.send(handler.send))
    .execute()
    .catch(e => next(e));
```

`builer().getListItem(index)` just re-return the last returned value or the first element of the last returned list, from a strategy-query-method. While `builder().define(string, index)` defines a new attribute in the last created (returned) object from the builder, and assigns a specified strategy-query-method returned value to it using an index (its second parameter).


## RouterInitializer



## Server Class



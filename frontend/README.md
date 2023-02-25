# Introduction

A three straightforward issues ought to take all of our concern while developing the frontend. The first is about the UI; we need to provide a well-organized and sophisticated tool that can deal, eligibly, with drawing different UI views for the user. The second is about state management; where the whole application data (user_info, products_list,...etc) is stored, and different data-related mechanisms are marshaled. The third is about Server Communications; the bridge that makes it possible for the frontend to communicate with the backend in a comprehensive and flexible manner. 

In the following sections, we shall describe and specify these three design components: _UIPainter_, _StateManager_, and _RequestDispatcher_; which are going to solve the three issues mentioned above, respectively.


# StateManager

StateManager takes the full responsibility to store various application data, and to provide its access and update facilities. This component ought to be the most stable among the others, and as abstract as possible; it considered to carry out the business rules: it must NOT depend on other components and must define a general reusable design that can implement the business rules and cope to their future changes.

Generally, storing and manipulating any kind of data requires defining two objects; one describes the structure of the data units, and the other declares the features — the methods that could be applied to the data. We shall give the both names: _Entity_ and _Controller_.

A state may be defined as a set of entities with a common controller. On the other hand, a StateManager requires an additional object to manage this entities-controller environment; it will delegate retrieval and manipulation functions to the controller, however, it's also responsible for creating/storing entities and adding, removing, and invoking update callbacks.

> State and StateManager terms are used interchangeably. For instance, UsersListState object has the postfix "State", however, it's defined as a StateManager; it invokes callbacks.

![StateManager Diagram](./docs/diagrams/StateManager-ClassDiagram.svg)

## Entity

It's just an object with three attributes: one of them is a unique key which identifies a specific unit of data, another is a cache value which could be used by the controller to avoid unnecessary overhead computations if possible, and finally the third is the value to be stored which could be of any type (it even could be another StateManager).

The cache could be used, for instance, to decide whether to update a big list of publications or not, one nieve way to do that is by comparing the length of the list with the number of current publications retrieved from the database. Moreover, the generality in the Entity value attribute gives StateManagers a nesting property; whereas each StateManager could contain more than one Entity in which another StateManager is stored.

## Controller

A Controller manipulates Entities of the kind that's associated to the same StateManager. It must not care about any thing rather than manipulating the entity value; it must not know about update callbacks or cache values. It only knows, at least, how to read, update, and remove the Entity value attribute.

Reading the value could simply be returning it, parsing it as a string or JSON first, or even reconstruct it to a specific more complex form then returning it. Updating the value should replace the entire value attribute with a new object adhering the structure in the specified Entity object. Removing the value is just replacing it with NULL (or an object with no values assigned to its attributes).

## AppState

A state is defined by a set of entities and a controller that's compatible with the structure of the entities. However, a State object is responsible to invoke the controller methods in order to manipulate the entities, and to store, remove, and invoke callbacks, as well.

In addition, it should give the user a method to get the state (the set of entities) compiled into one JSON object with the proper values been evaluated; if one of the entities is just another StateManager, then it must be compiled in turn as well. Similary, it shall provide a method for loading the state(s) from the JSON object.

## The Triad in Ground

Finally, in this section we are going to see how the triad: Entity, Controller, and AppState, can be employed together, in harmony, to develop a StateManager that's suitable for almost any software application. First of all, we'll define the RootState which we may call the "TRUE" StateManager (among all of these AppStates/StateManagers). Then, we shall define general types of states, from which all the required states in the application can be derived, to be used by the Root. And last but not least, a factory class may be added to improve the quality of the code: the StateFactory is responsible for generating and customizing derived states, from the general ones (SingleState & ListState), by using different structures (data unit object) specified by the user.

![RootState Diagram](./docs/diagrams/StateManager-RootState.svg)

### RootState

The RootState is an inherited class from the AppState with a specific Entity, Controller, and few mehtods implementations: like _needsUpdate_ and _generateCache_ (these are usually being overrided for any new class inherites AppState).

Typically, It's what the user will always need to store and retrieve different kinds of data; and so it shall be exported to and used by him with the name "StateManager". However, we may distinguish it from the other StateManagers (AppStates) by calling it the "TRUE" one!

What mainly distinguishes an AppState from another is the Entity. And the main trait of RootState is the type of its Entity value; the value that can be stored in RootState entities is one of two types: SingleState and/or ListState.

### SingleState & ListState

By considering the problem at hand: making a store web application, one can readily conclude that the user will only need two types of states regardless of the data units that'll be preserved. The first one is a state of a single entity, like "LoggedinUser" for instance, which we may call a _SingleState_. The second one is just a typical AppState with the SingleState as the type of the Entity value propery, which we may call a _ListState_.

As mentioned before, inherited AppStates are distinguished by three things: the Entity, the Controller, and the overrided methods. For instance, in order to make a SingleState, we ought to change the key type of the Entity to a constant string rather than an arbitrary one (which is easly implemented with TypeScript). In addition we shall dismiss the "addEntity" method and let the user set the value by the class constructor instead.

The end-states, that are ultimately used by the user to store data in the RootState, are created by specifying the structure of the SingleState value. For example, the structure {user_id, username,... etc} could be used to define a User end-state by specifying it as the type of the SingleState Entity value. Moreover, the creation of end-states should be generic; it shouldn't require more than defining the structure of the data. In other words, we should avoid the hell of inherited classes, by using a factory that takes a structure type, as a generic parameter, to create for us a ready to use SingleState, of the specified structure, and ListState, of the created SingleState.

> Details are not mentioned here, for instance "needsUpdate" method override, which is a must, hasn't been mentioned here. In implementaion, every method in the abstract class should be revisited and decided whether it needs to be extented or overrided, or it's just suitalbe for the inherited class. 

### StateFactory

The whole purpose of this class is to dynamically generate the AppStates that are meant to be exported to be used by the user. Without it, we will tediously declare and define several classes and write the same code over and over again: UserState, UserListState, PublicateState, PublicationListState,... etc. On the other hand, by using this class we will just need to define structures (data units), and pass them to a factory to which the process of end-state creation is delegated.


# RequestDispatcher

RequestDispatcher is considered as a bridge between the frontend and the backend; the frontend shall use it to retrieve data from the Database, and save the frequently used data by using the StateManager. It's up to the frontend implementation to decide whether it's worth retrieving the data from the StateManager or updating it and get the up-to-date version by using RequestDispatcher.

This component basically contains two elements: Dispatcher & RequestBuilder. Technically, the both objects contribute in constructing the (HTTP) request; the Dispatcher specifies requests proxy and headers, and the Builder specifies the url, the body and the method.

Dispatcher uses [Axios](https://axios-http.com/docs/intro) to send HTTP requests with a configuration object initialized with the suitable proxy and HTTP-request-header once the Dispatcher constructor is invoked. It has only one method, that's used to dispatch different requests, with only one parameter of type Request (an object with url, body and method as its only properties). It may also contain functions to return and replace configuration values. On the other hand, a RequestBuilder has dependency on [the Endpoint type of the Server component](../backend/README.md#server-component) to retrieve the right request url path associated with its method type.

The request body is prescribed by the implemented Builder classes; each class specifies the body structure (type). Generally, the "Builder.build" method builds Request objects out of Endpoints, and stores each Request, in a public object according to its method type, with a specified name. The body of the request, however, if not specified in the third parameter of the method, the Request will get generated with empty body value "{}".

![RequestDispatcher Diagram](./docs/diagrams/RequestDispatcher-ClassDiagram.svg)


# UIPainter

This component serves as a guide which leads any UI framework, a decision that can be taken throughout the project development lifecycle, to the way to be thoroughly integrated into the project. Maybe the best way to describe this component is to consider it as a generalized mold that reshapes any UI library, even the ones do not currently exist, to be more suitable and amenable to be plugged into the architecture.

UIPainter defines a set of views, illustrates the relations between them, and, more importantly, regulates the use of, and interaction with, the external environment.

The following sections discuss: the different types of views, how exactly they communicate with each other, and how views should interact with the external environment.

## Views Types

We may classify the views into three classes by which we can construct any UI system: constructive, interactive, and aesthetic. Each class has its own characteristics, however, they share some and even may intervene to produce a multi-purpose view.

There may be some properties and/or methods in common like: id, dimensions, a method to draw the view, and a method to destruct it. Which will be consolidated by a general class "View". Nevertheless, each type has its own characteristics and purpose; the purpose of a constructive view is to make and construct a container that collects several views, of any class, together; which is more suitable in the real world UI problems. Whereas an interactive class purpose is to employ user inputs and/or different events into the UI of the application; it literally gives life to the UI! Last but not least, the aesthetic view purpose is to ornament the UI with, for instance, notifications, pop-ups, animations, images, etc.

## Views Intercommunication

In order to make the architecture amenable to design a vivid world of views, we ought to assign one more responsibility and make an object creation constraint. The constraint states that no view object, except the constructive, can be created without being attached to a constructive view; meanly, there should exist a constuctive view, in advance, that's waiting for any other type of views to be attached to it. Whilst, the constructive view has one more responsibility which is the searching mechanism.

Consequently, any application should have at least one constructive view which, in implementation, we shall call it the "root". To get a specific view in the whole application we may use the search method in the root. The searching mechanism simply visits every view in the construction (including the constructive view itself) and compares its id to the required view id. If the required view is found, it gets returned by the function, otherwise it returns no object (NULL). However, the constructive view might delegate the whole process to the plugged framework.

![View Diagram](./docs/diagrams/UIPainter-ViewsDiagram.svg)

## Views and the Environment

In order to fill views with dynamic data and further give it access to the back-end, It shall got dependency on both: _StateManager_ and _RequestDispatcher_. The both objects may be passed and associated to a view while constructing it, however, It's optional and some views might need to be constructed with neither correspondance to a StateManager nor access to a RequistDispatcher.

In case a view is constructed with a StateManager associated to it, a RequestDispatcher must be passed along too, but not vice versa. The reason for this compulsory association is that the StateManager may indicate the need to update the data, thereby the view object ought to get access to the back-end in order to retrieve the up-to-date version and, in turn, reset the associated StateManager.

![View Diagram](./docs/diagrams/UIPainter-ExternalDeps.svg)

## DrawStrategy

As mentioned before, the main purpose of this component is to make the architecture independent of any UI framework, and so to be as portable as possible (it can be used for a web, desktop or mobile application). To further this purpose, we shall use the "Strategy Design Pattern" in order to delegate the draw function in View Objects to another dedicated object, which draws the UI by using a specific framework. In addition, a view object instance shall pass itself to the delegated strategy object, so it can access the required data of the view and/or invoke views event handlers. 

This design is considered as a receptacle through which different frameworks can be plugged into the architecture; And so it extents the architecture to a wide variety of applications.

![View Diagram](./docs/diagrams/UIPainter-ViewDrawer.svg)

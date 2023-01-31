# Introduction

A three straightforward issues ought to take all of our concern while developing the frontend. The first is about the UI; we need to provide a well-organized and sophisticated tool that can deal, eligibly, with drawing different UI views for the user. The second is about state management; where the whole application data (user_info, products_list,...etc) is stored, and different data-related mechanisms are marshaled. The third is about Server Communications; the bridge that makes it possible for the frontend to communicate with the backend in a comprehensive and flexible manner. 

In the following sections, we shall describe and specify these three design components: _UIPainter_, _StateManager_, and _RequestDispatcher_; which are going to solve the three issues mentioned above, respectively.


# StateManager

StateManager takes the full responsibility to store various application data, and to provide its access and update facilities. This component ought to be the most stable among the others, and as abstract as possible; it considered to carry out the business rules: it must NOT depend on other components and must define a general reusable design that can implement the business rules and cope to their future changes.

Generally, storing and manipulating any kind of data requires defining two objects; one descibes the structure of the data units, and the other declares the features — the methods that could be applied to the data. We shall give the both names: _Entity_ and _Controller_.

Nevertheless, this pair is not adequate for defining a StateManager, they are lack of management. An additional object shall be described in order to manage this entity-controller environment; by giving the users (other components) the suitable facilities to create Entities and take controll over any ones features.

![StateManager Diagram](./docs/diagrams/StateManager-ClassDiagram.svg)

## Entity

It's just an object with three attributes: one of them is a unique key which identifies a specific unit of data, another is a cache value which could be used by the controller to avoid unnecessary overhead computations if possible, and finally the third is the value to be stored which could be of any type (it even could be another StateManager).

The cache could be used, for instance, to decide whether to update a big list of publications or not, by comparing the length of the list with the number of current publications retrieved from the database. Moreover, the generality in the Entity value attribute gives StateManagers a nesting property; whereas each StateManager could contain more than one Entity in which another StateManager is stored. And this property will be profusely used in "Implemented Components" section in which we will define a tree of components that represents and illustrates the whole application state.

## Controller

A Controller controls the Entity (the specific contructed type) that associated to the same StateManager. It must not care about any thing rather than manipulating the entity value; it must not know about update callbacks or cache values. It only knows, at least, how to read, update, and remove the Entity value attribute.

Reading the value could simply be returning it, parsing it as a string or JSON first, or even reconstruct it to a specific more complex form then returning it. Updating the value sould replace the entire value attribute with a new object adhering the structure in the specified Entity object. Removing the value is just replacing it with NULL, it might be needed (in saving space) as the overall state could be saved in and loaded from local storage.

## AppState

A state is defined by a set of entities and a controller that's compatible with the structure of the entities. A State object is responsible to invoke the controller methods in order to manipulate the entities, and to store, remove, and invoke callbacks, as well.

In addition, it should give the user a method to get the state (the set of entities) compiled into one JS object with the proper values been evaluated; if one of the entities is just another StateManager, then it must be compiled in turn as well.

## Implemented Components

From the abstract component StateManager, we can inherit and implement as many as our need of states requires for different aspects in the system. Mainly, we shall define a root state with the default implementations associated to it, after that, and for the sake of global-store, we're going to derive three StateManagers from the root: UserSM, PublicationSM, and ReviewSM, and from each of these SMs (state managers), a various relative StateManagers would be derived. For instance, from UserSM we can inherit SignedInUser, UsersList,...etc. 

Any of the implemented components can be used by the external environment, however, the abstract one should not (usually the leaves will be the most used). So, different views will end up using different Managers with disparate sizes and different scopes of callbacks. Accordingly, callbacks invocation should propagate upwards, for instance, UserList callbacks invocation must invoke the parent (UserSM) callbacks afterwards, then the same happenes in UserSM, and so on until it reaches the root.

![StateManager - Implemented Components Diagram](./docs/diagrams/StateManager-ImplementedComponentsDiagram.svg)



# RequestDispatcher

This is the bridge which leads to the backend. The frontend shall use it along with StateManager to retrieve the data from the Database, and save the frequently used data by using the StateManager. It's up to the frontend implementation to decide whether it's worth retrieving the data from the StateManager or updating it and get the up-to-date version by using RequestDispatcher.

This component basically contains two elements: Dispatcher & RequestBuilder. Technically, the both objects contribute in constructing the (HTTP) request; the Dispatcher specifies requests proxy and headers, and the Builder specifies the url, the body and the method.

Dispatcher uses [Axios](https://axios-http.com/docs/intro) to send HTTP requests with a configuration object initialized with the suitable proxy and HTTP-request-header once the Dispatcher constructor is invoked. It has only one method, that's used to dispatch different requests, with only one parameter of type Request (an object with url, body and method as its only properties). It may also contain funtions to return and replace configuration values. On the other hand, a RequestBuilder has dependency on [the Endpoint type of the Server component](../backend/README.md#server-component) to retrieve the right request url path associated with its method type, while the body is described in the implementations of the RequestBuilder for each non-GET-method request.

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

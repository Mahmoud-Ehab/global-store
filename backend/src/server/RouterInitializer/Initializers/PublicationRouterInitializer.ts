import { PublicationEndpoints } from "../../Endpoints";
import { PublicationStrategy } from "../../QueriesStrategy/strategies/PublicationStrategy";
import { UserStrategy } from "../../QueriesStrategy/strategies/UserStrategy";
import { 
  AuthenticationFailed, 
  BadRequest, 
  Done, 
  NotFound 
} from "../../Responses";
import { RouterInitializerImp } from "../RouterInitializerImp";

export class PublicationRouterInitializer extends RouterInitializerImp {
  _routerName = "publication";

  init() {
    const user = new UserStrategy(this.queryManager, "users");
    const publication = new PublicationStrategy(this.queryManager, "publications");

    /*** get publication with a specific id ***/
    this.get(PublicationEndpoints.getPublication, (req, res, next) => {
      const pubid = parseInt(req.params.pubid);
      if (isNaN(pubid)) {
        next(BadRequest);
        return;
      }
      this.queryManager
      .query(publication.getById(pubid))
      .query(publication.ifExists())
      .query(publication.send(res))
      .execute()
      .catch(e => next(e))
    });
    

    /*** get list of publications with a specified limit ***/
    this.get(PublicationEndpoints.getPublicationsWithLimit, (req, res, next) => {
      const limit = parseInt(req.params.limit);
      if (isNaN(limit)) {
        next(BadRequest);
        return;
      }
      this.queryManager
      .query(publication.getLimit(limit))
      .query(publication.send(res))
      .execute()
      .catch(e => next(e))
    });


    /*** get list of publications with a specified limit and offset ***/
    this.get(PublicationEndpoints.getPublicationsWithLimitAndOffset, (req, res, next) => {
      const limit = parseInt(req.params.limit);
      const offset = parseInt(req.params.offset);
      if (isNaN(limit) || isNaN(offset)) {
        next(BadRequest);
        return;
      }
      this.queryManager
      .query(publication.getLimitWithOffset(limit, offset))
      .query(publication.send(res))
      .execute()
      .catch(e => next(e))
    });


    /*** get publications of a certain user ***/
    this.get(PublicationEndpoints.getPublicationsOfUser, (req, res, next) => {
      const userid = req.params.userid;
      if (!userid) {
        next(BadRequest);
        return;
      }
      this.queryManager
      .query(publication.getFilteredList({user_id: userid}))
      .query(publication.ifExists())
      .query(publication.send(res))
      .execute()
      .catch(e => next(e));
    });



    /*** create a new publication in the database ***/
    this.post(PublicationEndpoints.create, (req, res, next) => {
      const body = req.body;
      const cred = req.body.credentials;

      const required = {
        user_id: body.user_id,
        title: body.title,
        price: body.price,
        currency: body.currency,
      }
      const sub = {
        description: body.description,
        phone: body.phone,
      }
      const credentials = {
        username: cred ? cred.username : undefined,
        password: cred ? cred.password : undefined,
      }
      const pubBody = {...required, ...sub}

      if (this.hasUndefined(required, credentials)) {
        next(BadRequest);
        return;
      }

      //@TODO: encrypt password

      this.queryManager
      .query(user.getById(pubBody.user_id))
      .query(user.ifExists())
      .query(user.auth(credentials))
      .query(publication.insert(pubBody))
      .query(async () => res.json(Done()))
      .execute()
      .catch(e => next(e));
    })


    this.patch(PublicationEndpoints.update, (req, res, next) => {
      const required = {
        id: req.body.id,
        user_id: req.body.user_id,
        data: req.body.data
      }
      const cred = req.body.credentials;
      const credentials = {
        username: cred ? cred.username : undefined,
        password: cred ? cred.password : undefined
      }
      if (this.hasUndefined(required, credentials)) {
        next(BadRequest);
        return;
      }

      // Ensure that there are no id entries in required.data
      if (required.data.id !== undefined || required.data.user_id !== undefined) {
        next(BadRequest);
        return;
      }

      //@TODO: encrypt password

      this.queryManager
      .query(user.getById(required.user_id))
      .query(user.ifExists())
      .query(user.auth(credentials))
      .query(publication.getById(required.id))
      .query(publication.ifExists())
      .query(publication.update(required.data, {id: required.id}))
      .query(async () =>res.json(Done()))
      .execute()
      .catch(e => next(e));
    })


    /*** delete a publication from the database ***/
    this.delete(PublicationEndpoints.remove, (req, res, next) => {
      const reqBody = {
        id: req.body.id,
        user_id: req.body.user_id
      }
      const cred = req.body.credentials;
      const credentials = {
        username: cred ? cred.username : undefined,
        password: cred ? cred.password : undefined
      }
      if (this.hasUndefined(reqBody, credentials)) {
        next(BadRequest);
        return;
      }

      //@TODO: encrypt password

      this.queryManager
      .query(user.getById(reqBody.user_id))
      .query(user.ifExists())
      .query(user.auth(credentials))
      .query(publication.getById(reqBody.id))
      .query(publication.ifExists())
      .query(publication.delete({id: reqBody.id}))
      .query(async () => res.json(Done()))
      .execute()
      .catch(e => next(e));
    })
  }
}
import { PublicationEndpoints } from "../../Endpoints";
import { 
  AuthenticationFailed, 
  BadRequest, 
  DBError, 
  Done, 
  NotFound 
} from "../Responses";
import RouterFactoryImp from "../RouterFactoryImp";

class PublicationRouterFactory extends RouterFactoryImp {
  _routerName = "publication";

  init() {
    /*** get publication with a specific id ***/
    this.get(PublicationEndpoints.getPublication, (req, res, next) => {
      const pubid = parseInt(req.params.pubid);
      if (isNaN(pubid)) {
        next(BadRequest);
        return;
      }
      this.queryManager.query(async () => {
        const publication = await this.queryManager.publications.get(pubid);
        if (!publication.id) {
          next(NotFound);
          return;
        }
        res.json(Done({data: publication}));
      })
      .execute()
      .catch(e => next(DBError(e.code)))
    });
    

    /*** get list of publications with a specified limit ***/
    this.get(PublicationEndpoints.getPublicationsWithLimit, (req, res, next) => {
      const limit = parseInt(req.params.limit);
      if (isNaN(limit)) {
        next(BadRequest);
        return;
      }
      this.queryManager.query(async () => {
        const publications = await this.queryManager.publications.getLimit(limit);
        res.json(Done({data: publications}));
      })
      .execute()
      .catch(e => next(DBError(e.code)))
    });


    /*** get list of publications with a specified limit and offset ***/
    this.get(PublicationEndpoints.getPublicationsWithLimitAndOffset, (req, res, next) => {
      const limit = parseInt(req.params.limit);
      const offset = parseInt(req.params.offset);
      if (isNaN(limit) || isNaN(offset)) {
        next(BadRequest);
        return;
      }
      this.queryManager.query(async () => {
        const publications = await this.queryManager.publications.getLimitWithOffset(limit, offset);
        res.json(Done({data: publications}));
      })
      .execute()
      .catch(e => next(DBError(e.code)))
    });


    /*** get publications of a certain user ***/
    this.get(PublicationEndpoints.getPublicationsOfUser, (req, res, next) => {
      const userid = req.params.userid;
      if (!userid) {
        next(BadRequest);
        return;
      }

      this.queryManager.query(async () => {
        const pubs = await this.queryManager.publications.getFiltered({
          user_id: userid
        });
        res.json(Done({data: pubs}));
      })
      .execute()
      .catch(e => next(DBError(e.code)));
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
        phone: body.phone
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

      this.queryManager.query(async () => {
        const user = await this.queryManager.users.get(pubBody.user_id);
        if (!user.id) {
          next(NotFound);
          return;
        }
        if (!this.auth(user, credentials)) {
          next(AuthenticationFailed);
          return;
        }

        await this.queryManager.publications.insert(pubBody);
        res.json(Done());
      })
      .execute()
      .catch(e => next(DBError(e.code)));
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

      this.queryManager.query(async () => {
        const user = await this.queryManager.users.get(required.user_id);
        if (!user.id) {
          next(NotFound);
          return;
        }
        if (!this.auth(user, credentials)) {
          next(AuthenticationFailed);
          return;
        }
        const publication = await this.queryManager.publications.get(required.id);
        if (!publication.id) {
          next(NotFound);
          return;
        }
        await this.queryManager.publications.update(required.data, {id: required.id});
        next(Done());
      }).execute()
      .catch(e => next(DBError(e.code)));
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

      this.queryManager.query(async () => {
        const user = await this.queryManager.users.get(reqBody.user_id);
        if (!user.id) {
          next(NotFound);
          return;
        }
        if (!this.auth(user, credentials)) {
          next(AuthenticationFailed);
          return;
        }
        const publication = await this.queryManager.publications.get(reqBody.id);
        if (!publication.id) {
          next(NotFound);
          return;
        }
        await this.queryManager.publications.delete({id: publication.id});
        res.json(Done());
      })
      .execute()
      .catch(e => next(DBError(e.code)));
    })
  }
}

export default PublicationRouterFactory;
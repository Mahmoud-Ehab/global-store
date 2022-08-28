import { PublicationEndpoints } from "../../Endpoints";
import { 
  AuthenticationFailed, 
  BadRequest, 
  DBError, 
  Done, 
  NotFound 
} from "../Responses";
import RouterFactory from "../RouterFactory";

class PublicationRouterFactory extends RouterFactory {
  _routerName = "publication";

  init() {
    /* get publication with a specific id */
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
    
    /* get publications of a certain user */
    this.get(PublicationEndpoints.getPublicationsOfUser, (req, res, next) => {
      const userid = parseInt(req.params.userid);
      if (isNaN(userid)) {
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

    /* create a new publication in the database */
    this.post(PublicationEndpoints.create, (req, res, next) => {
      const required = {
        //@TODO: remove id attribute
        id: req.body.id,
        user_id: req.body.user_id,
        title: req.body.title,
        price: req.body.price,
        currency: req.body.currency,
      }
      const sub = {
        description: req.body.description,
        phone: req.body.phone
      }
      const credentials = {
        username: req.body.username,
        password: req.body.password,
      }
      const pubBody = {...required, ...sub}

      if (this.hasUndefined(required, credentials)) {
        next(BadRequest);
        return;
      }

      //@TODO: encrypt password

      this.queryManager.query(async () => {
        const user = await this.queryManager.users.get(pubBody.user_id);

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

    /* delete a publication from the database */
    this.delete(PublicationEndpoints.deletePublicaiton, (req, res, next) => {
      const reqBody = {
        id: req.body.id,
        user_id: req.body.user_id
      }
      const credentials = {
        username: req.body.username,
        password: req.body.password
      }
      if (this.hasUndefined(reqBody, credentials)) {
        next(BadRequest);
        return;
      }

      //@TODO: encrypt password

      this.queryManager.query(async () => {
        const user = await this.queryManager.users.get(reqBody.user_id);
        if (!this.auth(user, credentials)) {
          next(AuthenticationFailed);
          return;
        }
        const publication = await this.queryManager.publications.get(reqBody.id);
        if (!publication.id) {
          next(NotFound);
          return;
        }
        await this.queryManager.publications.delete(publication.id);
        res.json(Done());
      })
      .execute()
      .catch(e => {console.log(e); next(DBError(e.code))});
    })
  }
}

export default PublicationRouterFactory;
import { QueryManager } from "../../_modules/Database/QueryManager";
import { ExpressHandler } from "../ExpressHandler";
import { StrategiesFacade } from "../QueryStrategies";
import { Request } from "../../_modules/Server/Storages";
import { BadRequest, Done } from "../Responses";

export class PublicationHandler extends ExpressHandler {
  private sf: StrategiesFacade;

  constructor(queryManager: QueryManager) {
    super(queryManager);
    this.sf = new StrategiesFacade(this.queryManager);
  }

  publication_getById(req: Request) {
    // aliases for required QueryStrategies
    const publication = this.sf.publication;

    const pubid = parseInt(req.params.pubid);
    if (isNaN(pubid)) {
      this.error(BadRequest);
      return;
    }

    this.queryManager
    .query(publication.getById(pubid))
    .query(publication.ifExists())
    .query(publication.send(this.send.bind(this)))
    .execute()
    .catch(e => this.error(e))
  }

  publication_getLimit(req: Request) {
    // aliases for required QueryStrategies
    const publication = this.sf.publication;

    const limit = parseInt(req.params.limit);
    if (isNaN(limit)) {
      this.error(BadRequest);
      return;
    }

    this.queryManager
    .query(publication.getLimit(limit))
    .query(publication.send(this.send.bind(this)))
    .execute()
    .catch(e => this.error(e))
  }

  publication_getLimitAndOffset(req: Request) {
    // aliases for required QueryStrategies
    const publication = this.sf.publication;

    const limit = parseInt(req.params.limit);
    const offset = parseInt(req.params.offset);
    if (isNaN(limit) || isNaN(offset)) {
      this.error(BadRequest);
      return;
    }

    this.queryManager
    .query(publication.getLimitWithOffset(limit, offset))
    .query(publication.send(this.send.bind(this)))
    .execute()
    .catch(e => this.error(e))
  }

  publication_getOfUser(req: Request) {
    // aliases for required QueryStrategies
    const publication = this.sf.publication;

    const userid = req.params.userid;
    if (!userid) {
      this.error(BadRequest);
      return;
    }

    this.queryManager
    .query(publication.getFilteredList({user_id: userid}))
    .query(publication.ifExists())
    .query(publication.send(this.send.bind(this)))
    .execute()
    .catch(e => this.error(e));
  }


  publication_create(req: Request) {
    // aliases for required QueryStrategies
    const user = this.sf.user;
    const publication = this.sf.publication;

    const body = req.body;
    const token = req.body.token;

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
    const pubBody = {...required, ...sub}

    if (this.hasUndefined(required, {token})) {
      this.error(BadRequest);
      return;
    }

    this.queryManager
    .query(user.getById(pubBody.user_id))
    .query(user.ifExists())
    .query(user.authToken(token))
    .query(publication.insert(pubBody))
    .query(async () => this.send(Done()))
    .execute()
    .catch(e => this.error(e));
  }


  publication_update(req: Request) {
    // aliases for required QueryStrategies
    const user = this.sf.user;
    const publication = this.sf.publication;

    const required = {
      id: req.body.id,
      user_id: req.body.user_id,
      data: req.body.data,
      token: req.body.token
    }

    if (this.hasUndefined(required)) {
      this.error(BadRequest);
      return;
    }

    // Ensure that there are no id entries in required.data
    if (required.data.id !== undefined || required.data.user_id !== undefined) {
      this.error(BadRequest);
      return;
    }

    this.queryManager
    .query(user.getById(required.user_id))
    .query(user.ifExists())
    .query(user.authToken(required.token))
    .query(publication.getById(required.id))
    .query(publication.ifExists())
    .query(publication.update(required.data, {id: required.id}))
    .query(async () =>this.send(Done()))
    .execute()
    .catch(e => this.error(e));
  }


  publication_delete(req: Request) {
    // aliases for required QueryStrategies
    const user = this.sf.user;
    const publication = this.sf.publication;

    const reqBody = {
      id: req.body.id,
      user_id: req.body.user_id,
      token: req.body.token
    }

    if (this.hasUndefined(reqBody)) {
      this.error(BadRequest);
      return;
    }

    this.queryManager
    .query(user.getById(reqBody.user_id))
    .query(user.ifExists())
    .query(user.authToken(reqBody.token))
    .query(publication.getById(reqBody.id))
    .query(publication.ifExists())
    .query(publication.delete({id: reqBody.id}))
    .query(async () => this.send(Done()))
    .execute()
    .catch(e => this.error(e));
  }
}
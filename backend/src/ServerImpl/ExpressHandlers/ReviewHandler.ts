import { QueryManager } from "../../_modules/Database/QueryManager";
import { ExpressHandler } from "../ExpressHandler";
import { StrategiesFacade } from "../QueryStrategies";
import { Request } from "../../_modules/Server/Types";
import { BadRequest, Done } from "../Responses";

export class ReviewHandler extends ExpressHandler {
  private sf: StrategiesFacade;

  constructor(queryManager: QueryManager) {
    super(queryManager);
    this.sf = new StrategiesFacade(this.queryManager);
  }

  review_get(req: Request) {
    // aliases for required QueryStrategies
    const user = this.sf.user;
    const review = this.sf.review;

    const reqparams = {
      pubid: parseInt(req.params.pubid),
      userid: req.params.userid
    }
    if (this.hasUndefined(reqparams) || isNaN(reqparams.pubid)) {
      this.error(BadRequest);
      return;
    }

    this.queryManager
    .query(user.getById(reqparams.userid))
    .query(user.ifExists())
    .query(review.getFilteredList({
      publication_id: reqparams.pubid, 
      user_id: reqparams.userid
    }))
    .query(review.ifExists())
    .query(review.builder().getListItem(0))
    .query(review.builder().define("user", 4))
    .query(review.send(this.send.bind(this)))
    .execute()
    .catch(e => this.error(e));
  }

  review_getOfPublication(req: Request) {
    // aliases for required QueryStrategies
    const review = this.sf.review;

    const pubid = parseInt(req.params.pubid);
    if (!pubid || isNaN(pubid)) {
      this.error(BadRequest);
      return;
    }

    this.queryManager
    .query(review.getJoinUsers({publication_id: pubid}))
    .query(review.send(this.send.bind(this)))
    .execute()
    .catch(e => this.error(e));
  }

  review_getOfUser(req: Request) {
    // aliases for required QueryStrategies
    const review = this.sf.review;

    const userid = req.params.userid;
    if (!userid) {
      this.error(BadRequest);
      return;
    }

    this.queryManager
    .query(review.getFilteredList({user_id: userid}))
    .query(review.send(this.send.bind(this)))
    .execute()
    .catch(e => this.error(e));
  }


  review_create(req: Request) {
    // aliases for required QueryStrategies
    const user = this.sf.user;
    const publication = this.sf.publication;
    const review = this.sf.review;

    const reqBody = {
      user_id: req.body.user_id,
      publication_id: req.body.publication_id,
      title: req.body.title,
      body: req.body.body,
    }
    const token = req.body.token;

    if (this.hasUndefined(reqBody, {token})) {
      this.error(BadRequest);
      return;
    }

    this.queryManager
    .query(user.getById(reqBody.user_id))
    .query(user.ifExists())
    .query(user.authToken(token))
    .query(publication.getById(reqBody.publication_id))
    .query(publication.ifExists())
    .query(review.insert(reqBody))
    .query(async () => this.send(Done()))
    .execute()
    .catch(e => this.error(e));
  }


  review_update(req: Request) {
    // aliases for required QueryStrategies
    const user = this.sf.user;
    const publication = this.sf.publication;
    const review = this.sf.review;

    const reqBody = {
      user_id: req.body.user_id,
      publication_id: req.body.publication_id,
      data: req.body.data,
      token: req.body.token
    }

    if (this.hasUndefined(reqBody)) {
      this.error(BadRequest);
      return;
    }

    const [tmp_user_id, tmp_pub_id] = [
      reqBody.data.user_id, 
      reqBody.data.publication_id
    ];
    if (tmp_user_id !== undefined || tmp_pub_id !== undefined) {
      this.error(BadRequest);
      return;
    }

    this.queryManager
    .query(user.getById(reqBody.user_id))
    .query(user.ifExists())
    .query(user.authToken(reqBody.token))
    .query(publication.getById(reqBody.publication_id))
    .query(publication.ifExists())
    .query(review.getFilteredList({
      user_id: reqBody.user_id,
      publication_id: reqBody.publication_id
    }))
    .query(review.ifExists())
    .query(review.update(reqBody.data, {
      user_id: reqBody.user_id,
      publication_id: reqBody.publication_id
    }))
    .query(async () => this.send(Done()))
    .execute()
    .catch(e => this.error(e));
  }


  review_delete(req: Request) {
    // aliases for required QueryStrategies
    const user = this.sf.user;
    const publication = this.sf.publication;
    const review = this.sf.review;

    const reqBody = {
      user_id: req.body.user_id,
      publication_id: req.body.publication_id,
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
    .query(publication.getById(reqBody.publication_id))
    .query(publication.ifExists())
    .query(review.getFilteredList({
      user_id: reqBody.user_id,
      publication_id: reqBody.publication_id
    }))
    .query(review.ifExists())
    .query(review.delete({
      publication_id: reqBody.publication_id, 
      user_id: reqBody.user_id
    }))
    .query(async () => this.send(Done()))
    .execute()
    .catch(e => this.error(e));
  }
}
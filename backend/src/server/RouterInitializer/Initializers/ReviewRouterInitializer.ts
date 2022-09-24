import { ReviewEndpoints } from "../../Endpoints";
import { PublicationStrategy } from "../../QueriesStrategy/strategies/PublicationStrategy";
import { ReviewStrategy } from "../../QueriesStrategy/strategies/ReviewStrategy";
import { UserStrategy } from "../../QueriesStrategy/strategies/UserStrategy";
import { AuthenticationFailed, BadRequest, Done, NotFound } from "../../Responses";
import { RouterInitializerImp } from "../RouterInitializerImp";

export class ReviewRouterInitializer extends RouterInitializerImp {
  _routerName = "review";

  init() {
    const user = new UserStrategy(this.queryManager, "users");
    const publication = new PublicationStrategy(this.queryManager, "publications");
    const review = new ReviewStrategy(this.queryManager, "reviews");

    /*** get a specific review with its publication_id and user_id ***/
    this.get(ReviewEndpoints.getReview, (req, res, next) => {
      const reqparams = {
        pubid: parseInt(req.params.pubid),
        userid: req.params.userid
      }
      if (this.hasUndefined(reqparams) || isNaN(reqparams.pubid)) {
        next(BadRequest);
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
      .query(review.send(res.json))
      .execute()
      .catch(e => next(e));
    });



    /*** get list of reviews of a specific publciation ***/
    this.get(ReviewEndpoints.getReviewsOfPublication, (req, res, next) => {
      const pubid = parseInt(req.params.pubid);
      if (!pubid || isNaN(pubid)) {
        next(BadRequest);
        return;
      }
      this.queryManager
      .query(review.getFilteredList({publication_id: pubid}))
      .query(review.send(res.json))
      .execute()
      .catch(e => next(e));
    });



    /*** get list of reviews of a specific user ***/
    this.get(ReviewEndpoints.getReviewsOfUser, (req, res, next) => {
      const userid = req.params.userid;
      if (!userid) {
        next(BadRequest);
        return;
      }
      this.queryManager
      .query(review.getFilteredList({user_id: userid}))
      .query(review.send(res.json))
      .execute()
      .catch(e => next(e));
    });



    /*** create new review ***/
    this.post(ReviewEndpoints.create, (req, res, next) => {
      const reqBody = {
        user_id: req.body.user_id,
        publication_id: req.body.publication_id,
        title: req.body.title,
        body: req.body.body
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
      .query(publication.getById(reqBody.publication_id))
      .query(publication.ifExists())
      .query(review.insert(reqBody))
      .query(async () => res.json(Done()))
      .execute()
      .catch(e => next(e));
    });



    /*** update an existing review content ***/
    this.patch(ReviewEndpoints.update, (req, res, next) => {
      const reqBody = {
          user_id: req.body.user_id,
          publication_id: req.body.publication_id,
          data: req.body.data
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
      this.queryManager
      .query(user.getById(reqBody.user_id))
      .query(user.ifExists())
      .query(user.auth(credentials))
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
      .query(async () => res.json(Done()))
      .execute()
      .catch(e => next(e));
    });



    /*** delete an existing review ***/
    this.delete(ReviewEndpoints.remove, (req, res, next) => {
      const reqBody = {
        user_id: req.body.user_id,
        publication_id: req.body.publication_id,
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
      .query(async () => res.json(Done()))
      .execute()
      .catch(e => next(e));
    });
  }
}

import express = require("express");

import { RouterInitializer } from "../../_modules/Server/RouterInitializer";
import { QueryManagerInterface } from "../../_modules/Database/QueryManagerInterface";
import { UserStrategy, PublicationStrategy, ReviewStrategy } from "../QueryStrategies";
import { ReviewEndpoints } from "../Endpoints";

import { 
  BadRequest, 
  Done, 
} from "../../_modules/Server/Responses";

export class ReviewRouterInitializer extends RouterInitializer<express.Router> {

  constructor(qm: QueryManagerInterface) {
    super("review", express.Router(), qm);
  }

  init() {
    const user = new UserStrategy(this.queryManager);
    const publication = new PublicationStrategy(this.queryManager);
    const review = new ReviewStrategy(this.queryManager);
    const jsonOf = (res: any) => (payload: any) => res.json(payload);

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
      .query(review.send(jsonOf(res)))
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
      .query(review.getJoinUsers({publication_id: pubid}))
      .query(review.send(jsonOf(res)))
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
      .query(review.send(jsonOf(res)))
      .execute()
      .catch(e => next(e));
    });



    /*** create new review ***/
    this.post(ReviewEndpoints.create, (req, res, next) => {
      const reqBody = {
        user_id: req.body.user_id,
        publication_id: req.body.publication_id,
        title: req.body.title,
        body: req.body.body,
      }
      const token = req.body.token;

      if (this.hasUndefined(reqBody, {token})) {
        next(BadRequest);
        return;
      }

      this.queryManager
      .query(user.getById(reqBody.user_id))
      .query(user.ifExists())
      .query(user.authToken(token))
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
          data: req.body.data,
          token: req.body.token
      }

      if (this.hasUndefined(reqBody)) {
        next(BadRequest);
        return;
      }

      const [tmp_user_id, tmp_pub_id] = [
        reqBody.data.user_id, 
        reqBody.data.publication_id
      ];
      if (tmp_user_id !== undefined || tmp_pub_id !== undefined) {
        next(BadRequest);
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
      .query(async () => res.json(Done()))
      .execute()
      .catch(e => next(e));
    });



    /*** delete an existing review ***/
    this.delete(ReviewEndpoints.remove, (req, res, next) => {
      const reqBody = {
        user_id: req.body.user_id,
        publication_id: req.body.publication_id,
        token: req.body.token
      }

      if (this.hasUndefined(reqBody)) {
        next(BadRequest);
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
      .query(async () => res.json(Done()))
      .execute()
      .catch(e => next(e));
    });
  }
}

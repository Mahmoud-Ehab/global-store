import { ReviewEndpoints } from "../../Endpoints";
import { AuthenticationFailed, BadRequest, DBError, Done, NotFound } from "../Responses";
import RouterFactoryImp from "../RouterFactoryImp";

class ReviewRouterFactory extends RouterFactoryImp {
  _routerName = "review";

  init() {
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
      this.queryManager.query(async () => {
        const user = await this.queryManager.users.get(reqparams.userid);
        const result = await this.queryManager.reviews.getFiltered({
          publication_id: reqparams.pubid, 
          user_id: reqparams.userid
        });
        if (!result[0].title) {
          next(NotFound);
          return;
        }
        res.json(Done({data: {...result[0], user}}));
      })
      .execute()
      .catch(e => next(DBError(e.code)));
    });



    /*** get list of reviews of a specific publciation ***/
    this.get(ReviewEndpoints.getReviewsOfPublication, (req, res, next) => {
      const pubid = parseInt(req.params.pubid);
      if (!pubid || isNaN(pubid)) {
        next(BadRequest);
        return;
      }
      this.queryManager.query(async () => {
        const result = await this.queryManager.reviews.getFiltered({
          publication_id: pubid
        });

        const resjson = {data: new Array()}
        for (const review of result) {
          const user = await this.queryManager.users.get(review.user_id);
          resjson.data.push({...review, user});
        }
        res.json(Done(resjson));
      })
      .execute()
      .catch(e => next(DBError(e.code)));
    });



    /*** get list of reviews of a specific user ***/
    this.get(ReviewEndpoints.getReviewsOfUser, (req, res, next) => {
      const userid = req.params.userid;
      if (!userid) {
        next(BadRequest);
        return;
      }
      this.queryManager.query(async () => {
        const result = await this.queryManager.reviews.getFiltered({
          user_id: userid
        });
        const user = await this.queryManager.users.get(userid);

        const resjson = {data: new Array()}
        for (const review of result) {
          resjson.data.push({...review, user});
        }
        res.json(Done(resjson));
      })
      .execute()
      .catch(e => next(DBError(e.code)));
    });



    /*** create new review ***/
    this.post(ReviewEndpoints.create, (req, res, next) => {
      const reqBody = {
        user_id: req.body.user_id,
        publication_id: req.body.publication_id,
        title: req.body.title,
        body: req.body.body
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
        await this.queryManager.reviews.insert(reqBody);
        res.json(Done());
      })
      .execute()
      .catch(e => next(DBError(e.code)));
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
      this.queryManager.query(async () => {
        const user = await this.queryManager.users.get(reqBody.user_id);
        if (!this.auth(user, credentials)) {
          next(AuthenticationFailed);
          return;
        }
        const review = (await this.queryManager.reviews.getFiltered({
          user_id: reqBody.user_id,
          publication_id: reqBody.publication_id
        }))[0];
        if (!review.title) {
          next(NotFound);
          return;
        }
        await this.queryManager.reviews.update(reqBody.data, {
          user_id: reqBody.user_id,
          publication_id: reqBody.publication_id
        });
        res.json(Done());
      })
      .execute()
      .catch(e => next(DBError(e.code)));
    });



    /*** delete an existing review ***/
    this.delete(ReviewEndpoints.remove, (req, res, next) => {
      const reqBody = {
        user_id: req.body.user_id,
        publication_id: req.body.publication_id,
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
        const review = (await this.queryManager.reviews.getFiltered({
          user_id: reqBody.user_id,
          publication_id: reqBody.publication_id
        }))[0];
        if (!review.title) {
          next(NotFound);
          return;
        }
        await this.queryManager.reviews.delete({
          publication_id: reqBody.publication_id, 
          user_id: reqBody.user_id
        });
        res.json(Done());
      })
      .execute()
      .catch(e => next(DBError(e.code)));
    });
  }
}

export default ReviewRouterFactory;
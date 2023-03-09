import express = require("express");
import { createHmac } from "node:crypto";

import { RouterInitializer } from "../../_modules/Server/RouterInitializer";
import { QueryManager } from "../../_modules/Database/QueryManager";
import { UserStrategy } from "../QueryStrategies";
import { UserEndpoints } from "../Endpoints";

import { 
  Authenticated,
  BadRequest, 
  Done, 
} from "../../_modules/Server/Responses";

export class UserRouterInitializer extends RouterInitializer<express.Router> {

  constructor(qm: QueryManager) {
    super("user", express.Router(), qm);
  }

  private generateId(username: string): string {
    const randnum = Math.floor(Math.random() * 10000);
    return username.slice(0, 2) + randnum;
  }

  private encrypt(secret: string): string {
    return createHmac('sha256', secret)
    .update('aolym@kfgl$lq#agi#@lasdjgf@kfo23kasdfm')
    .digest('hex');
  }

  private generateToken(): string {
    let randomSecret = "";
    const symbols = "agi75w@mk4$v2os&p1n6zuy";

    for (let i = 0; i < 10; i++) {
      const r = Math.floor(Math.random() * 100 % symbols.length);
      randomSecret += symbols[r];
    }

    return this.encrypt(randomSecret);
  }

  init() {
    const user = new UserStrategy(this.queryManager);
    const jsonOf = (res: any) => (payload: any) => res.json(payload);

    /*** Get User with a specific id ***/
    this.get(UserEndpoints.getUser, (req, res, next) => {
      const userid = req.params.userid;

      this.queryManager
      .query(user.getById(userid))
      .query(user.ifExists())
      .query(user.send(jsonOf(res)))
      .execute()
      .catch(e => next(e));
    });


    
    /*** Get list of a limited number of users ***/
    this.get(UserEndpoints.getUsersLimit, (req, res, next) => {
      const limit = parseInt(req.params.limit);
      if (isNaN(limit)) { 
        next(BadRequest)
        return;
      }
      this.queryManager
      .query(user.getLimit(limit))
      .query(user.send(jsonOf(res)))
      .execute()
      .catch(e => next(e));
    });



    /*** Login Endpoint ***/
    this.post(UserEndpoints.login, (req, res, next) => {
      const reqBody = {
        username: req.body.username,
        password: req.body.password,
      };
      if (this.hasUndefined(reqBody)) {
        next(BadRequest);
        return;
      }

      /*
        @DONE: generate user_token and store it in the database,
        it shall be used as a substitute for password in other
        requests.
      */
      const token = this.generateToken();

      //@DONE: Encrypt the password in reqBody obj
      reqBody.password = this.encrypt(reqBody.password);

      this.queryManager
      .query(user.getFilteredList({username: reqBody.username}))
      .query(user.ifExists())
      .query(user.auth(reqBody))
      .query(user.setToken(token))
      .query(async () => res.json(Authenticated(token)))
      .execute()
      .catch(e => next(e));
    });



    /*** Register new user Endpoint ***/
    this.post(UserEndpoints.register, (req, res, next) => {
      const reqBody = {
        username: req.body.username,
        password: req.body.password,
        id: req.body.username ? this.generateId(req.body.username) : undefined,
        token: undefined as string
      };
      if (reqBody.id)
        reqBody.token = reqBody.id + "." + this.generateToken();

      if (this.hasUndefined(reqBody)) {
        next(BadRequest);
        return;
      }

      //@DONE: Encrypt the password in reqBody obj
      reqBody.password = this.encrypt(reqBody.password);

      this.queryManager
      .query(user.getFilteredList({username: reqBody.username}))
      .query(user.ifNotExists())
      .query(user.insert(reqBody))
      .query(async () => res.json(Done({
        id: reqBody.id,
        token: reqBody.token
      })))
      .execute()
      .catch(e => next(e));
    });



    /*** Update certain user info ***/
    this.patch(UserEndpoints.update, (req, res, next) => {
      const reqBody = {
        id: req.body.id, 
        data: req.body.data
      }
      const cred = req.body.credentials;
      const credentials = {
        username: cred ? cred.username : undefined,
        password: cred ? cred.password : undefined,
      }
      if (this.hasUndefined(reqBody, credentials)) {
        next(BadRequest);
        return;
      }
      if (reqBody.data.id !== undefined) {
        next(BadRequest);
        return;
      }

      //@TODO: password should be replaced by token_id
      credentials.password = this.encrypt(credentials.password);

      this.queryManager
      .query(user.getById(reqBody.id))
      .query(user.ifExists())
      .query(user.auth(credentials))
      .query(user.update(reqBody.data, {id: reqBody.id}))
      .query(async () => res.json(Done()))
      .execute()
      .catch(e => next(e));
    });


    
    /*** Delete user with its id, and  after auth succeeds ***/
    this.delete(UserEndpoints.remove, (req, res, next) => {
      const reqBody = {
        id: req.body.id,
      }
      const cred = req.body.credentials;
      const credentials = {
        username: cred ? cred.username : undefined,
        password: cred ? cred.password : undefined,
      }
      if (this.hasUndefined(reqBody, credentials)) {
        next(BadRequest);
        return;
      }

      //@TODO: password should be replaced by token_id
      credentials.password = this.encrypt(credentials.password);

      this.queryManager
      .query(user.getById(reqBody.id))
      .query(user.ifExists())
      .query(user.auth(credentials))
      .query(user.delete({id: reqBody.id}))
      .query(async () => res.json(Done()))
      .execute()
      .catch(e => next(e));
    });
  }
}

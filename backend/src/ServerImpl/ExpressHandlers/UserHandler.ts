import { createHmac } from "node:crypto";

import { ExpressHandler } from "../ExpressHandler";
import { StrategiesFacade } from "../QueryStrategies";
import { Request } from "../../_modules/Server/Storages";
import { QueryManager } from "../../_modules/Database/QueryManager";
import { Authenticated, BadRequest, Done } from "../../_modules/Server/Responses";

export class UserHandler extends ExpressHandler {
  private sf: StrategiesFacade;

  constructor(queryManager: QueryManager) {
    super(queryManager);
    this.sf = new StrategiesFacade(this.queryManager);
  }

  user_getById(req: Request) {
    const user = this.sf.user; // an alias for userStrategy 
    const userid = req.params.userid;

    this.queryManager
    .query(user.getById(userid))
    .query(user.ifExists())
    .query(user.send(this.send.bind(this)))
    .execute()
    .catch(e => this.error(e));
  }

  user_getLimit(req: Request) {
    const user = this.sf.user; // an alias for userStrategy 
    const limit = parseInt(req.params.limit);

    if (isNaN(limit)) { 
      this.error(BadRequest)
      return;
    }

    this.queryManager
    .query(user.getLimit(limit))
    .query(user.send(this.send.bind(this)))
    .execute()
    .catch(e => this.error(e));
  }


  user_login(req: Request) {
    const user = this.sf.user; // an alias for userStrategy 
    const reqBody = {
      username: req.body.username,
      password: req.body.password,
    };
    if (this.hasUndefined(reqBody)) {
      this.error(BadRequest);
      return;
    }

    const token = this.generateToken();
    reqBody.password = this.encrypt(reqBody.password);

    this.queryManager
    .query(user.getFilteredList({username: reqBody.username}))
    .query(user.ifExists())
    .query(user.auth(reqBody))
    .query(user.setToken(token))
    .query(async () => this.send(Authenticated(token)))
    .execute()
    .catch(e => this.error(e));
  }

  user_register(req: Request) {
    const user = this.sf.user; // an alias for userStrategy 
    const reqBody = {
      username: req.body.username,
      password: req.body.password,
      id: req.body.username ? this.generateId(req.body.username) : undefined,
      token: ""
    };
    if (reqBody.id)
      reqBody.token = reqBody.id + "." + this.generateToken();

    if (this.hasUndefined(reqBody)) {
      this.error(BadRequest);
      return;
    }

    reqBody.password = this.encrypt(reqBody.password);

    this.queryManager
    .query(user.getFilteredList({username: reqBody.username}))
    .query(user.ifNotExists())
    .query(user.insert(reqBody))
    .query(async () => this.send(Done({
      id: reqBody.id,
      token: reqBody.token
    })))
    .execute()
    .catch(e => this.error(e));
  }

  
  user_update(req: Request) {
    const user = this.sf.user; // an alias for userStrategy 
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
      this.error(BadRequest);
      return;
    }
    if (reqBody.data.id !== undefined) {
      this.error(BadRequest);
      return;
    }

    credentials.password = this.encrypt(credentials.password);

    this.queryManager
    .query(user.getById(reqBody.id))
    .query(user.ifExists())
    .query(user.auth(credentials))
    .query(user.update(reqBody.data, {id: reqBody.id}))
    .query(async () => this.send(Done()))
    .execute()
    .catch(e => this.error(e));
  }


  user_delete(req: Request) {
    const user = this.sf.user; // an alias for userStrategy 
    const reqBody = {
      id: req.body.id,
    }
    const cred = req.body.credentials;
    const credentials = {
      username: cred ? cred.username : undefined,
      password: cred ? cred.password : undefined,
    }
    if (this.hasUndefined(reqBody, credentials)) {
      this.error(BadRequest);
      return;
    }

    credentials.password = this.encrypt(credentials.password);

    this.queryManager
    .query(user.getById(reqBody.id))
    .query(user.ifExists())
    .query(user.auth(credentials))
    .query(user.delete({id: reqBody.id}))
    .query(async () => this.send(Done()))
    .execute()
    .catch(e => this.error(e));
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
}
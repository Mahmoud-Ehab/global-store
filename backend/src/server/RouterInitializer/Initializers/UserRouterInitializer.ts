import { UserEndpoints } from "../../Endpoints";
import { UserStrategy } from "../../QueriesStrategy/strategies/UserStrategy";
import { 
  Authenticated,
  BadRequest, 
  Done,
} from "../../Responses";
import { RouterInitializerImp } from "../RouterInitializerImp";

export class UserRouterInitializer extends RouterInitializerImp {
  _routerName = "user";

  init() {
    const user = new UserStrategy(this.queryManager, "users");
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

      //@TODO: Encrypt the password in reqBody obj

      this.queryManager
      .query(user.getFilteredList({username: reqBody.username}))
      .query(user.ifExists())
      .query(user.auth(reqBody))
      .query(async () => res.json(Authenticated))
      .execute()
      .catch(e => next(e));
    });



    /*** Register new user Endpoint ***/
    this.post(UserEndpoints.register, (req, res, next) => {
      const reqBody = {
        username: req.body.username,
        password: req.body.password,
        id: req.body.username ? this.generateId(req.body.username) : undefined,
      };
      if (this.hasUndefined(reqBody)) {
        next(BadRequest);
        return;
      }

      //@TODO: Encrypt the password in reqBody obj

      this.queryManager
      .query(user.getFilteredList({username: reqBody.username}))
      .query(user.ifNotExists())
      .query(user.insert(reqBody))
      .query(async () => res.json(Done({id: reqBody.id})))
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

      //@TODO: Encrypt the password in reqBody obj
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

      //@TODO: Encrypt the password in reqBody obj
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

  private generateId(username: string): string {
    const randnum = Math.floor(Math.random() * 10000);
    return username.slice(0, 2) + randnum;
  }
}

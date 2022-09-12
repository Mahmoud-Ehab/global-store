import { UserEndpoints } from "../../Endpoints";
import { 
  Authenticated,
  AuthenticationFailed, 
  BadRequest, 
  DBError,
  Done,
  NotFound, 
} from "../Responses";
import RouterFactoryImp from "../RouterFactoryImp";

class UserRouterFactory extends RouterFactoryImp {
  _routerName = "user";

  init() {
    /*** Get User with a specific id ***/
    this.get(UserEndpoints.getUser, (req, res, next) => {
      const userid = req.params.userid;

      this.queryManager.query(async () => {
        const result = await this.queryManager.users.get(userid);
        if (!result.id) {
          next(NotFound);
          return;
        }
          
        result.password = undefined;
        res.json(Done({data: result}));
      })
      .execute()
      .catch(e =>next(DBError(e.code)));
    });



    /*** Get list of a limited number of users ***/
    this.get(UserEndpoints.getUsersLimit, (req, res, next) => {
      const limit = parseInt(req.params.limit);
      if (isNaN(limit)) { 
        next(BadRequest)
        return; 
      }

      this.queryManager.query(async () => {
        const result = await this.queryManager.users.getLimit(limit);

        for (const user of result)
          user.password = undefined;

        res.json(Done({data: result}));
      })
      .execute()
      .catch(e =>next(DBError(e.code)));
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

      this.queryManager.query(async () => {
        const userQuery = await this.queryManager.users.getFiltered({
          username: reqBody.username
        });
        if (!userQuery[0]) {
          next(NotFound);
          return;
        }
        const auth = await this.queryManager.users.auth(userQuery[0].id, reqBody);
        if (!auth) {
          next(AuthenticationFailed);
          return;
        }
        res.json(Authenticated);
      })
      .execute()
      .catch(e => next(DBError(e.code)));
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

      this.queryManager.query(async () => {
          await this.queryManager.users.insert(reqBody);
          res.json(Done({id: reqBody.id}));
      })
      .execute()
      .catch(e => next(DBError(e.code)));
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

      this.queryManager.query(async () => {
        const auth = await this.queryManager.users.auth(reqBody.id, credentials);
        if (!auth) {
          next(AuthenticationFailed);
          return;
        }
        await this.queryManager.users.update(reqBody.data, {id: reqBody.id});
        res.json(Done());
      })
      .execute()
      .catch(e => next(DBError(e.code)));
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

      this.queryManager.query(async () => {
        const user = await this.queryManager.users.get(reqBody.id);
        if (!user.id) {
          next(NotFound);
          return;
        }
        const auth = await this.queryManager.users.auth(reqBody.id, credentials);
        if (!auth) {
          next(AuthenticationFailed);
          return;
        }
        await this.queryManager.users.delete({id: reqBody.id});
        res.json(Done());
      })
      .execute()
      .catch(e => next(DBError(e.code)));
    });
  }

  private generateId = (username: string): string => {
    const randnum = Math.floor(Math.random() * 10000);
    return username.slice(0, 2) + randnum;
  }
}

export default UserRouterFactory;
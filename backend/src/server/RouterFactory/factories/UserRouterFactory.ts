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
        const result = await this.queryManager.users.getFiltered({
          username: reqBody.username,
        })
        if (!result[0]) {
          next(NotFound);
          return;
        }
        if (result[0].password !== reqBody.password) {
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
        //@TODO: remove this test once you finished testing
        id: !req.body.id ? this.generateId(req.body.username) : req.body.id,
      };
      if (this.hasUndefined(reqBody)) {
        next(BadRequest);
        return;
      }

      //@TODO: Encrypt the password in reqBody obj

      this.queryManager.query(async () => {
          await this.queryManager.users.insert(reqBody);
          res.json(Done());
      })
      .execute()
      .catch(e => next(DBError(e.code)));
    });



    /*** Update certain user info ***/
    this.patch(UserEndpoints.update, (req, res, next) => {
      const reqBody = {
        id: req.body.id, 
        data: req.body.data
      };
      const credentials = {
        username: req.body.username,
        password: req.body.password
      };
      if (this.hasUndefined(reqBody, credentials)) {
        next(BadRequest);
        return;
      }

      //@TODO: Encrypt the password in reqBody obj

      this.queryManager.query(async () => {
        const userResult = await this.queryManager.users.get(reqBody.id);
        if (!userResult.id) {
          next(NotFound);
          return;
        }
        if (!this.auth(userResult, credentials)) {
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
        username: req.body.username,
        password: req.body.password
      };
      if (this.hasUndefined(reqBody)) {
        next(BadRequest);
        return;
      }

      //@TODO: Encrypt the password in reqBody obj

      this.queryManager.query(async () => {
        const userResult = await this.queryManager.users.get(reqBody.id);
        if (!userResult.id) {
          next(NotFound);
          return;
        }
        if (!this.auth(userResult, reqBody)) {
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
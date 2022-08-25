import { 
  Authenticated,
  AuthenticationFailed, 
  BadRequest, 
  DBError,
  Done,
  NotFound, 
} from "../Responses";
import RouterFactory from "../RouterFactory";


class UserRouterFactory extends RouterFactory {
  _routerName = "user";

  init() {
    this.get('/:userid', (req, res, next) => {
      const userid = req.params.userid;

      this.queryManager.query(async () => {
        const result = await this.queryManager.users.get(userid);
        if (!result.id) res.json(NotFound);
        else res.json(Done({data: result}));
      })
      .execute()
      .catch(e =>next(DBError(e.code)));
    });

    this.get('/limit/:limit', (req, res, next) => {
      const limit = parseInt(req.params.limit);
      if (isNaN(limit)) next(BadRequest);

      this.queryManager.query(async () => {
        const result = await this.queryManager.users.getLimit(limit);
        res.json(Done({data: result}));
      })
      .execute()
      .catch(e =>next(DBError(e.code)));
    });


    this.post('/login', (req, res, next) => {
      const reqBody = {
        username: req.body.username || next(BadRequest),
        password: req.body.password || next(BadRequest),
      };

      //@TODO: Encrypt the password in reqBody obj

      this.queryManager.query(async () => {
        const result = await this.queryManager.users.getFiltered({
          username: reqBody.username,
        })

        if (result.length === 0) 
          res.json(NotFound);
        else if (result[0].password === reqBody.password)
          res.json(Authenticated);
        else
          res.json(AuthenticationFailed);
      })
      .execute()
      .catch(e =>next(DBError(e.code)));
    });

    this.post('/register', (req, res, next) => {
      const reqBody = {
        username: req.body.username || next(BadRequest),
        password: req.body.password || next(BadRequest),
        //@TODO: remove this test once you finished testing
        id: !req.body.id ? this.generateId(req.body.username) : req.body.id,
      };

      //@TODO: Encrypt the password in reqBody obj

      this.queryManager.query(async () => {
          await this.queryManager.users.insert(reqBody);
          res.json(Done());
      })
      .execute()
      .catch(e => next(DBError(e.code)));
    });


    this.delete('/delete', (req, res, next) => {
      const reqBody = {
        id: req.body.id || next(BadRequest), 
        username: req.body.username || next(BadRequest),
        password: req.body.password || next(BadRequest)
      };

      //@TODO: Encrypt the password in reqBody obj

      this.queryManager.query(async () => {
        const userResult = await this.queryManager.users.get(reqBody.id);

        if (userResult.username === reqBody.username)
        if (userResult.password === reqBody.password) {
          await this.queryManager.users.delete(reqBody.id);
          res.json(Done());
          return;
        }

        res.json(AuthenticationFailed);
      })
      .execute()
      .catch(e => next(DBError(e.code)));
    });


    this.patch('/update', (req, res, next) => {
      const reqBody = {
        id: req.body.id || next(BadRequest), 
        username: req.body.username || next(BadRequest),
        password: req.body.password || next(BadRequest)
      };

      //@TODO: Encrypt the password in reqBody obj

      this.queryManager.query(async () => {
        const userResult = await this.queryManager.users.get(reqBody.id);

        if (userResult.username === reqBody.username)
        if (userResult.password === reqBody.password) {
          await this.queryManager.users.update(reqBody.id, reqBody);
          res.json(Done());
          return;
        }

        res.json(AuthenticationFailed);
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
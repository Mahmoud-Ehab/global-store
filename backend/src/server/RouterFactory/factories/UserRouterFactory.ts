import RouterFactory from "../RouterFactory";

class UserRouter extends RouterFactory {
  _routerName = "user";

  init() {
    this.get('/get/:userid', (_req, _res) => {
      const userid = parseInt(_req.params.userid);
      if (!isNaN(userid))
        this.queryManager.query(
          async () => _res.json(await this.queryManager.users.get(userid))
        ).execute();
      else
        _res.json({error: `invalid input: ${_req.params.userid}`});
    });
  }
}

export default UserRouter;
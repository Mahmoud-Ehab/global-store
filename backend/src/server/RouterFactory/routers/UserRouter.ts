import RouterFactory from "../RouterFactory";

class UserRouter extends RouterFactory {
  init() {
    this.get('/get/:userid', (_req, _res) => {
      const { userid } = JSON.parse(_req.params.toString());
      this.queryManager.query(async () => { 
        const userdata = await this.queryManager.users.get(userid);
        _res.json(userdata);
      });
    });
  }
}

export default UserRouter;
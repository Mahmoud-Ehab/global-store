import RouterFactory from "../RouterFactory";

class UserRouter extends RouterFactory {
  init() {
    this.get('/get/:userid', (_req, _res) => {
      _res.send("test");
    });
  }
}

export default UserRouter;
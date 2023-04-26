import { Dispatcher } from "../../modules/RequestDispatcher/Dispatcher";
import { Request, Response, Proxy, Headers } from "../../modules/RequestDispatcher/Storage";

const axios = require("axios").default;

export class AxiosDispatcher extends Dispatcher {
  dispatch(req: Request): Response {
    return axios({
      headers: this.getHeaders(),
      proxy: this.getProxy(),
      method: req.method,
      url: req.url,
      data: req.body,
    });
  }
}
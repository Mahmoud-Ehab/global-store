import { Dispatcher } from "../../modules/RequestDispatcher/Dispatcher";
import { Request, Response, Proxy, Headers } from "../../modules/RequestDispatcher/Storage";

const axios = require("axios").default;

export class AxiosDispatcher implements Dispatcher {
  private headers: Headers;
  private proxy: Proxy;

  constructor(headers: Headers, proxy: Proxy) {
    this.headers = {...headers};
    this.proxy = {...proxy};
  }

  dispatch(req: Request): Response {
    return axios({
      headers: this.headers,
      proxy: this.proxy,
      method: req.method,
      url: req.url,
      data: req.body,
    });
  }
  getHeaders(): Headers {
    return {...this.headers};
  }
  getProxy(): Proxy {
    return {...this.proxy};
  }
}
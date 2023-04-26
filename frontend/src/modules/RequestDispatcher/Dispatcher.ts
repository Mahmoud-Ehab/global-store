import { Request } from "./Storage/Request";
import { Response } from "./Storage/Response";
import { Proxy } from "./Storage/Proxy";
import { Headers } from "./Storage/Headers";

export class Dispatcher {
  private headers: Headers;
  private proxy: Proxy;

  constructor(headers: Headers, proxy: Proxy) {
    this.headers = {...headers};
    this.proxy = {...proxy};
  }

  dispatch(req: Request): Response {
    return fetch(req.url, {
      headers: this.headers,
      method: req.method,
      body: JSON.stringify(req.body)
    });
  }

  getHeaders(): Headers {
    return {...this.headers};
  }

  getProxy(): Proxy {
    return {...this.proxy};
  }
}
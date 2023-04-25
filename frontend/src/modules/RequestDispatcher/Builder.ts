import { Endpoint, Request } from "./Storage";

type ReqFunc = (body?: Object, ...params: any[]) => Request;

export abstract class Builder<R extends string> {
  requests: Record<R, ReqFunc> = Object.create({});

  protected build(name: string, endpoint: Endpoint) {
    type Params = Parameters<typeof endpoint.path>

    const reqFunc: ReqFunc = (body?: Object, ...params: Params) => ({
      url: endpoint.path(...params),
      method: endpoint.type,
      body: body || {}
    });

    Object.defineProperty(
      this.requests, 
      name, 
      {
        value: reqFunc,
        enumerable: true
      }
    );
  }
}
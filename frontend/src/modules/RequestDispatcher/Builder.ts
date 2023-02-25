import { Endpoint, Request } from "./types";

export abstract class Builder<T> {
  GET: Object = {};
  POST: Object = {};
  PATCH: Object = {};
  DELETE: Object = {};

  build(endpoint: Endpoint, name: string, body?: T) {
    const newRequest: Request = {
      url: endpoint.path,
      method: endpoint.type,
      body: body || {}
    }
    Object.defineProperty(
      this[endpoint.type], 
      name, 
      {value: newRequest}
    );
  }
}
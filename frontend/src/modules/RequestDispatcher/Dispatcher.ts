import { Request } from "./Storage/Request";
import { Response } from "./Storage/Response";
import { Proxy } from "./Storage/Proxy";
import { Headers } from "./Storage/Headers";

export interface Dispatcher {
  dispatch(req: Request): Response;
  getHeaders(): Headers;
  getProxy(): Proxy;
}

import { Request } from "./types/Request";
import { Response } from "./types/Response";
import { Proxy } from "./types/Proxy";
import { Headers } from "./types/Headers";

export interface Dispatcher {
  dispatch(req: Request): Response;
  getHeaders(): Headers;
  getProxy(): Proxy;
}

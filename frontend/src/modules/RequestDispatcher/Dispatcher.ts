import { Request } from "./types/Request";
import { Response } from "./types/Response";
import { Proxy } from "./types/Proxy";

export interface Dispatcher {
  dispatch(req: Request): Response;
  getHeaders(): string;
  getProxy(): Proxy;
  setHeaders(headers: string): void;
  setProxy(proxy: Proxy): void;
}

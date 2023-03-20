import { RequestHandler } from "../RequestHandler";
import { Endpoint } from "./Endpoint";

export interface Router {
  define: (endpoint: Endpoint, handler: RequestHandler) => void
}

import { Handler } from "./Handler";
import { Endpoint } from "./Endpoint";

export interface Router {
  define: (endpoint: Endpoint, handler: Handler) => void
}

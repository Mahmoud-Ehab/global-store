import { Handler } from "./Handler";

export type Router = {
  get: (path: string, ...handlers: Array<Handler>) => void;
  post: (path: string, ...handlers: Array<Handler>) => void;
  delete: (path: string, ...handlers: Array<Handler>) => void;
  patch: (path: string, ...handlers: Array<Handler>) => void;
}

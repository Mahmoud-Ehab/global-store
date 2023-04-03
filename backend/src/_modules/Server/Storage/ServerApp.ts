import { Router } from "./Router";

export interface ServerApp {
  use: (routername: string, router: Router) => void;
  listen: (port: number, host: string, callback: Function) => void;
  close: (callback: Function) => void;
}

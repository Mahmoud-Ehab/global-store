import { Router } from "./Router";

export type ServerApp = {
  listen: (port: number, host: string, callback: Function) => void;
  use: (routername: string, router: Router) => void
}

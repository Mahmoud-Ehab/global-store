import { RequestHandler } from "./RequestHandler";
import { Endpoint, Router } from "./Types";

export abstract class RouterInitializer {
  private _router: Router;
  private _routerName: string;

  protected handler: RequestHandler;

  constructor(routerName: string, router: Router, handler: RequestHandler) {
    this._routerName = routerName;
    this._router = router;
    this.handler = handler;
  }

  get router(): Router {
    return this._router;
  }

  get routerName(): string {
    return this._routerName;
  }

  init(): void {
    throw new Error("Method not implemented.");
  }

  protected define(endpoint: Endpoint) {
    this._router.define(endpoint, this.handler);
  }
}

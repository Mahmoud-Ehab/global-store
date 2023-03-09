import { QueryManagerInterface } from "../Database/QueryManagerInterface";
import { Endpoint, Router, Handler } from "./Types";

export abstract class RouterInitializer<R extends Router> {
  private _router: R;
  private _routerName: string;

  protected queryManager: QueryManagerInterface;

  constructor(routerName: string, router: R, qm: QueryManagerInterface) {
    this._routerName = routerName;
    this._router = router
    this.queryManager = qm;
  }

  get router(): R {
    return this._router;
  }

  get routerName(): string {
    return this._routerName;
  }

  init(): void {
    throw new Error("Method not implemented.");
  }

  protected get(endpoint: Endpoint, ...handlers: Handler[]) {
    this._router.get(endpoint.expressPath, ...handlers);
  }

  protected post(endpoint: Endpoint, ...handlers: Handler[]) {
    this._router.post(endpoint.expressPath, ...handlers);
  }

  protected delete(endpoint: Endpoint, ...handlers: Handler[]): void {
    this._router.delete(endpoint.expressPath, ...handlers);
  }

  protected patch(endpoint: Endpoint, ...handlers: Handler[]): void {
    this._router.patch(endpoint.expressPath, ...handlers);
  }

  protected hasUndefined(...objs: any) {
    for (const obj of objs) {
      for (const key in obj)
        if (obj[key] === undefined)
          return true;
    }
    return false;
  }
}

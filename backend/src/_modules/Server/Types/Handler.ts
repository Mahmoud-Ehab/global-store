import { QueryManager } from "../../Database/QueryManager";
import { Request } from "./Request";
import { Response } from "./Response";

export abstract class Handler {
  protected queryManager: QueryManager;

  constructor(queryManager: QueryManager) {
    this.queryManager = queryManager;
  }

  handle(req: Request) {
    const reqname = req.body["request_name"];
    
    if (typeof this[reqname as keyof this] !== 'function') {
      this.error({
        code: 400, 
        message: "Bad Request: invalid request_name."
      });
      return;
    }

    (this[reqname as keyof this] as Function)(req);
  }

  send(response: Response) {
    throw Error("method not implemented.");
  }

  error(e: {code: number, message: string}) {
    throw Error("method not implemented.");
  }
}

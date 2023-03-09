interface Request {
  params: any;
  body: any;
}

interface Response {
  json: (payload: object) => void;
}

export type Handler = (req: Request, res: Response, next: Function) => void

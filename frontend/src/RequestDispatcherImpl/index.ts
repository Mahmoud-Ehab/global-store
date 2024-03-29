import { AxiosDispatcher } from "@sfawd/axios";

import { UserReqBuilder } from "./Builders/UserReqBuilder";
import { PubReqBuilder } from "./Builders/PubReqBuilder";
import { RevReqBuilder } from "./Builders/RevReqBuilder";

const Dispatcher = new AxiosDispatcher(
  {'Content-Type': 'application/json'}, 
  {
    protocol: 'http',
    host: 'localhost',
    port: 5000
  }
);

export {
  Dispatcher, 
  UserReqBuilder,
  PubReqBuilder,
  RevReqBuilder
};

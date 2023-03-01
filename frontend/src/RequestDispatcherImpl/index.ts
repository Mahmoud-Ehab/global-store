import { AxiosDispatcher } from "./Dispatchers/AxiosDispatcher";
import {
  UserReqBuilder
} from "./Builders/UserReqBuilder";

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
  UserReqBuilder
};

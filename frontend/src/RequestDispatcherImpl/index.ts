import { AxiosDispatcher } from "./Dispatchers/AxiosDispatcher";
import {
  UserReqBuilder
} from "./Builders/UserReqBuilder";

export const Dispatcher = new AxiosDispatcher(
  {'Content-Type': 'application/json'}, 
  {
    protocol: 'http',
    host: 'localhost',
    port: 5000
  }
);

export const UserRequests = (new UserReqBuilder()).requests;

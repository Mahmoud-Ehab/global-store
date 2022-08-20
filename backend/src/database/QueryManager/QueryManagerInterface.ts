import DataController from "../DataController/DataControllerInterface";

interface QueryManager {
  get users(): DataController<any>;
  get publications(): DataController<any>;
  get reviews(): DataController<any>;
  query(func: Function): QueryManager;
  execute(): Promise<boolean | Error>;
}

export default QueryManager;
import { StateFactory } from "../../modules/StateManager/StateFactory";

export const ObjectState = new StateFactory<{value: object}>().createSingleState();

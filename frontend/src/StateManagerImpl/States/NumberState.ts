import { StateFactory } from "../../modules/StateManager/StateFactory";

export const NumberState = new StateFactory<{value: number}>().createSingleState();

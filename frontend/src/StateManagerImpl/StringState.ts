import { StateFactory } from "../modules/StateManager/StateFactory";

export const StringState = new StateFactory<{value: string}>().createSingleState();

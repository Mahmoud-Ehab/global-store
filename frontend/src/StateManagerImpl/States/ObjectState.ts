import { StateFactory } from "sfawd";

export const ObjectState = new StateFactory<{value: object}>().createSingleState();

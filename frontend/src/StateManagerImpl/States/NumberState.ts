import { StateFactory } from "sfawd";

export const NumberState = new StateFactory<{value: number}>().createSingleState();

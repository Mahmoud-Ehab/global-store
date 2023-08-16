import { StateFactory } from "sfawd";

export const StringState = new StateFactory<{value: string}>().createSingleState();

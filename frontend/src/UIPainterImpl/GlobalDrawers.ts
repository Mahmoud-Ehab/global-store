import { PureJS_Drawers } from "./drawers/PureJS_Drawers";

// In case we want to change the technology used in drawing
// all views at once, we may change only the value of this 
// variable.
const GlobalDrawers = new PureJS_Drawers();
export { GlobalDrawers };
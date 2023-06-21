import { StateManager } from "../StateManagerImpl";

type ScreenSizes = {
    mobile_small: number,
    mobile_medium: number,
    mobile_large: number,
    
    taplet_small: number,
    taplet_medium: number,
    taplet_large: number,

    laptop_small: number,
    laptop_medium: number,
    laptop_large: number,
}

export class MediaQuery {
    private clientWidth: number;
    private clientHeight: number;

    private screenSizes: ScreenSizes = {
        mobile_small: 320,
        mobile_medium: 375,
        mobile_large: 425,

        taplet_small: 720,
        taplet_medium: 768,
        taplet_large: 920,

        laptop_small: 1024,
        laptop_medium: 1280,
        laptop_large: 1440,
    }

    constructor() {
        if (StateManager.get("screenWidth") && StateManager.get("screenHeight")) { 
            this.clientWidth = StateManager.get("screenWidth").toObject().value;
            this.clientHeight = StateManager.get("screenHeight").toObject().value;
        }
        else {
            throw Error("No 'screenWidth' or 'screenHeight' are found in the StateManager.");
        }
        Object.freeze(this.screenSizes);
    }

    get sizes() {
        return this.screenSizes;
    }

    minWidth(size: keyof ScreenSizes) {
        return this.clientWidth >= this.screenSizes[size];
    }

    maxWidth(size: keyof ScreenSizes) {
        return this.clientWidth <= this.screenSizes[size];
    }

    minHeight(size: keyof ScreenSizes) {
        return this.clientHeight >= this.screenSizes[size];
    }

    maxHeight(size: keyof ScreenSizes) {
        return this.clientHeight <= this.screenSizes[size];
    }
}
import { StateManager } from "../StateManagerImpl";

export class MediaQuery {
    private clientWidth: number;
    private clientHeight: number;

    constructor() {
        this.clientWidth = StateManager.get("screenWidth").toObject().value;
        this.clientHeight = StateManager.get("screenHeight").toObject().value;
    }

    minWidth(width: number) {
        return this.clientWidth >= width;
    }

    maxWidth(width: number) {
        return this.clientWidth <= width;
    }

    minHeight(height: number) {
        return this.clientHeight >= height;
    }

    maxHeight(height: number) {
        return this.clientHeight <= height;
    }
}
import {Music} from "@types";
import fs from "fs";

class GameLocation {
    private name: string;
    private image: string;
    private music: Music;

    constructor(name: string, imagePath: string, music: Music) {
        this.name = name;
        this.image = fs.readFileSync(imagePath, { encoding: 'base64' });
        this.music = music;
    }
}

export default GameLocation;
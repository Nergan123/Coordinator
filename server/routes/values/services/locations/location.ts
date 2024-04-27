import fs from "fs";

class GameLocation {
    public name: string;
    private image: string;
    private map: string;
    private description: string;
    musicCalm: string[];
    musicBattle: string[];

    constructor(name: string, description: string, imagePath: string, mapPath: string, musicCalm: string[], musicBattle: string[]) {
        this.name = name;
        this.description = description;
        this.map = fs.readFileSync(mapPath, { encoding: 'base64' });
        this.image = fs.readFileSync(imagePath, { encoding: 'base64' });
        this.musicCalm = musicCalm;
        this.musicBattle = musicBattle;
    }
}

export default GameLocation;
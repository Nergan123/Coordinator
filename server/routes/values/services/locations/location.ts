class GameLocation {
    public name: string;
    image: string;
    map: string;
    description: string;
    musicCalm: string[];
    musicBattle: string[];

    constructor(name: string, description: string, imagePath: string, mapPath: string, musicCalm: string[], musicBattle: string[]) {
        this.name = name;
        this.description = description;
        this.map = mapPath;
        this.image = imagePath;
        this.musicCalm = musicCalm;
        this.musicBattle = musicBattle;
    }
}

export default GameLocation;
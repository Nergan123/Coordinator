import data from "../../../../data/locations.json";
import GameLocation from "./location";

class Locations {
    private readonly locations: GameLocation[];

    constructor() {
        this.locations = Object.values(data).map((location: any) => {
            console.log(data);
            return new GameLocation(location.name, location.description, location.image, location.map, location.musicCalm, location.musicBattle);
        });
    }

    public getLocations(): GameLocation[] {
        return this.locations;
    }
}

export default Locations;
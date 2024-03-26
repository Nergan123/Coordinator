import data from "../../../../data/locations.json";
import GameLocation from "./location";

class Locations {
    private readonly locations: GameLocation[];

    constructor() {
        this.locations = data.map((location: any) => {
            return new GameLocation(location.name, location.image, location.music);
        });
    }

    public getLocations(): GameLocation[] {
        return this.locations;
    }
}

export default Locations;
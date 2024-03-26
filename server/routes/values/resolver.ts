import {Request} from "express-serve-static-core";
import Enemies from "./services/enemies/enemies";
import Locations from "./services/locations/locations";
import Roles from "./services/roles/roles";
import Characters from "./services/characters/characters";

class Resolver {
    private enemies: Enemies;
    private locations: Locations;
    private roles: Roles;
    private characters: Characters;

    constructor() {
        this.enemies = new Enemies()
        this.locations = new Locations()
        this.roles = new Roles()
        this.characters = new Characters()
    }

    public async getValue(req: Request) {
        if (req.body.value == "enemies"){
            return this.enemies.getEnemies()
        } else if (req.body.value == "locations"){
            return this.locations.getLocations()
        } else if (req.body.value == "roles"){
            return this.roles.getRoles()
        } else if (req.body.value == "characters"){
            if (!req.user){
                throw Error("User is not authenticated")
            }
            return await this.characters.getCharactersFromDB(req.user.id);
        }

        throw Error("Can't find value: " + req.body.value)
    }
}

export default Resolver;
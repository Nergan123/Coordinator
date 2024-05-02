import {Request} from "express-serve-static-core";
import Enemies from "./services/enemies/enemies";
import Locations from "./services/locations/locations";
import Roles from "./services/roles/roles";
import Characters from "./services/characters/characters";
import fs from "fs";

class Resolver {
    public enemies: Enemies;
    public locations: Locations;
    public roles: Roles;
    public characters: Characters;

    constructor() {
        this.enemies = new Enemies()
        this.locations = new Locations()
        this.roles = new Roles()
        this.characters = new Characters()
    }

    public async getValue(req: Request) {
        if (req.body.value == "enemies"){
            return this.enemies.getEnemies().map(enemy => {
                return {
                    id: enemy.id,
                    hp: enemy.hp,
                    name: enemy.name,
                    image: fs.readFileSync(enemy.image, "base64"),
                    description: enemy.description,
                    abilities: enemy.abilities,
                    armor: enemy.armor
                }
            });
        } else if (req.body.value == "locations"){
            return this.locations.getLocations().map(location => {
                return {
                    name: location.name,
                    description: location.description,
                    image: fs.readFileSync(location.image, "base64"),
                    map: fs.readFileSync(location.map, "base64"),
                    musicCalm: location.musicCalm,
                    musicBattle: location.musicBattle
                }
            });
        } else if (req.body.value == "roles"){
            return this.roles.getRoles().map(
                role => {
                    return {
                        id: role.id,
                        name: role.name,
                        stats: role.stats,
                        image: fs.readFileSync(role.image, "base64"),
                        description: role.description,
                        weapons: role.weapons,
                        abilities: role.abilities
                    }
                }
            );
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
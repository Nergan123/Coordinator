import {Request} from "express-serve-static-core";
import Enemies from "./services/enemies/enemies";
import Locations from "./services/locations/locations";
import Roles from "./services/roles/roles";
import Characters from "./services/characters/characters";
import Bucket from "../../utils/bucket";

class Resolver {
    public enemies: Enemies;
    public locations: Locations;
    public roles: Roles;
    public characters: Characters;
    private bucket: Bucket;

    constructor() {
        this.enemies = new Enemies()
        this.locations = new Locations()
        this.roles = new Roles()
        this.characters = new Characters()
        this.bucket = new Bucket()
    }

    public async getValue(req: Request) {
        if (req.body.value == "enemies") {
            const enemies = this.enemies.getEnemies();
            return Promise.all(enemies.map(async enemy => {
                const url = await this.bucket.getSignedUrl(enemy.image);
                return {
                    id: enemy.id,
                    hp: enemy.hp,
                    name: enemy.name,
                    image: url,
                    description: enemy.description,
                    abilities: enemy.abilities,
                    armor: enemy.armor
                }
            }));
        } else if (req.body.value == "locations") {
            const locations = this.locations.getLocations();
            return Promise.all(locations.map(async location => {
                const imageUrl = await this.bucket.getSignedUrl(location.image);
                const mapUrl = await this.bucket.getSignedUrl(location.map);
                return {
                    name: location.name,
                    description: location.description,
                    image: imageUrl,
                    map: mapUrl,
                    musicCalm: location.musicCalm,
                    musicBattle: location.musicBattle
                }
            }));
        } else if (req.body.value == "roles") {
            const roles = this.roles.getRoles();
            return Promise.all(roles.map(async role => {
                const url = await this.bucket.getSignedUrl(role.image);
                return {
                    id: role.id,
                    name: role.name,
                    stats: role.stats,
                    image: url,
                    description: role.description,
                    weapons: role.weapons,
                    abilities: role.abilities
                }
            }));
        } else if (req.body.value == "characters") {
            if (!req.user) {
                throw Error("User is not authenticated")
            }
            return await this.characters.getCharactersFromDB(req.user.id);
        }

        throw Error("Can't find value: " + req.body.value)
    }
}

export default Resolver;
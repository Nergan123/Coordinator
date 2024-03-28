import {Ability, Stats, Weapon} from "@types";
import fs from "fs";

class Role {
    private readonly id: number;
    public readonly name: string;
    private readonly stats: Stats;
    private readonly image: string;
    private description: string;
    private weapons: Weapon[];
    private abilities: Ability[];

    constructor(id: number, name: string, stats: Stats, imagePath: string, description: string, weapons: Weapon[], abilities: Ability[]) {
        this.id = id;
        this.name = name;
        this.stats = stats;
        this.image = fs.readFileSync(imagePath, { encoding: 'base64' });
        this.description = description;
        this.weapons = weapons;
        this.abilities = abilities;
    }

}

export default Role;
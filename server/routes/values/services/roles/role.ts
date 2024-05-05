import {Ability, Stats, Weapon} from "@types";

class Role {
    readonly id: number;
    public readonly name: string;
    readonly stats: Stats;
    public image: string;
    description: string;
    weapons: Weapon[];
    abilities: Ability[];

    constructor(id: number, name: string, stats: Stats, imagePath: string, description: string, weapons: Weapon[], abilities: Ability[]) {
        this.id = id;
        this.name = name;
        this.stats = stats;
        this.image = imagePath;
        this.description = description;
        this.weapons = weapons;
        this.abilities = abilities;
    }

}

export default Role;
import {Ability} from "@types";

class Enemy {
    readonly name: string;
    readonly hp: number;
    readonly abilities: Ability[];
    public readonly id: number;
    readonly armor: number;
    readonly image: string;
    readonly description: string;

    constructor(name: string, health: number, abilities: Ability[], id: number, armor: number, imagePath: string, description: string) {
        this.name = name;
        this.hp = health;
        this.abilities = abilities;
        this.id = id;
        this.armor = armor;
        this.image = imagePath;
        this.description = description;
    }
}

export default Enemy;
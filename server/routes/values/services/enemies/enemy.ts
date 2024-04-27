import {Ability} from "@types";
import fs from "fs";

class Enemy {
    private readonly name: string;
    private readonly hp: number;
    private readonly abilities: Ability[];
    public readonly id: number;
    private readonly armor: number;
    private readonly image: string;
    private readonly description: string;

    constructor(name: string, health: number, abilities: Ability[], id: number, armor: number, imagePath: string, description: string) {
        this.name = name;
        this.hp = health;
        this.abilities = abilities;
        this.id = id;
        this.armor = armor;
        this.image = fs.readFileSync(imagePath, { encoding: 'base64' });
        this.description = description;
    }
}

export default Enemy;
import {Weapon} from "@types";
import fs from "fs";

class Role {
    private readonly id: number;
    public readonly name: string;
    private readonly hp: number;
    private readonly ac: number;
    private readonly image: string;
    private description: string;
    private weapons: Weapon[];

    constructor(id: number, name: string, hp: number, ac: number, imagePath: string, description: string, weapons: Weapon[]) {
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.ac = ac;
        this.image = fs.readFileSync(imagePath, { encoding: 'base64' });
        this.description = description;
        this.weapons = weapons;
    }

}

export default Role;
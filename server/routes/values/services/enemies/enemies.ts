import data from "../../../../data/enemies.json"
import Enemy from "./enemy";

class Enemies {

    private readonly enemies: Enemy[]

    constructor() {
        this.enemies = data.map((enemy: any) => {
            return new Enemy(enemy.name, enemy.hp, enemy.abilities, enemy.id, enemy.armor, enemy.image);
        });
    }
    public getEnemies(): Enemy[] {
        return this.enemies;
    }
}

export default Enemies
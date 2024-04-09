import { logger } from "../../utils/logger";
import State from "./state";
import winston from "winston";
import DbHandler from "../../utils/db";
import {Item} from "@types";
import Resolver from "../values/resolver";

class Game {
    public readonly state: State;
    private readonly logger: winston.Logger;
    private db: DbHandler;
    private resolver: Resolver;

    constructor() {
        this.state = new State();
        this.db = new DbHandler();
        this.logger = logger;
        this.resolver = new Resolver();
        try {
            this.state.load().then(() => {
                this.logger.info("State loaded successfully");
            });
        } catch (e) {
            console.error(e);
        }
    }

    public addCharacter(character: string, userId: string) {
        this.markCharacterAsActive(character, userId);
        this.state.addCharacter(character, userId).then(r => {
            this.logger.info("Character added");
        });
    }

    private markCharacterAsActive(character: string, userId: string) {
        const query = `UPDATE characters SET status = $1 WHERE user_id = $2`;
        const values = [false, userId];
        this.db.query(query, values).then(() => {
            const query = `UPDATE characters SET status = $1 WHERE user_id = $2 AND name = $3`;
            const values = [true, userId, character];
            this.db.query(query, values).then(() => {
                this.logger.info("Character marked as active");
            });
        });
    }

    public getState() {
        return this.state.getState();
    }

    public updateEncounter(enemies: number[], location: string) {
        const enemiesToSend = this.resolver.enemies.getEnemies().filter((enemy: any) => {
            return enemies.includes(enemy.id);
        });
        const locationToSend = this.resolver.locations.getLocations().find((loc: any) => {
            return loc.name === location;
        });
        if (!locationToSend) {
            throw new Error("Location not found");
        }
        this.state.updateEncounter(enemiesToSend, locationToSend)
    }

    public updateCharacterItems(userId: string, cell: number, item: Item) {
        this.state.updateCharacterItems(userId, cell, item).then(() => {
            this.logger.info("Items updated");
        });
    }
}

export default Game;
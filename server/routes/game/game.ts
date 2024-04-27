import {logger} from "../../utils/logger";
import State from "./state";
import winston from "winston";
import DbHandler from "../../utils/db";
import {Item} from "@types";
import Resolver from "../values/resolver";
import Enemy from "../values/services/enemies/enemy";
import Audio from "./audio";

class Game {
    public readonly state: State;
    private readonly logger: winston.Logger;
    private db: DbHandler;
    private resolver: Resolver;
    public audio: Audio;

    constructor() {
        this.audio = new Audio();
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
        this.state.load().then(() => {
            this.logger.info("State loaded successfully");
            this.getMusic(this.state.battle !== null)
        });
    }

    public addCharacter(character: string, userId: string) {
        this.markCharacterAsActive(character, userId);
        this.state.addCharacter(character, userId).then(r => {
            this.logger.info("Character added");
        });
    }

    public deleteCharacter(userId: string) {
        this.state.deleteCharacter(userId)
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

    private getMusic(status: boolean) {
        if (status) {
            const randomIndex = Math.floor(Math.random() * this.state.encounter.location.musicBattle.length);
            this.audio.setUrl(this.state.encounter.location.musicBattle[randomIndex]);
        } else {
            const randomIndex = Math.floor(Math.random() * this.state.encounter.location.musicCalm.length);
            this.audio.setUrl(this.state.encounter.location.musicCalm[randomIndex]);
        }
    }

    public updateEncounter(enemies: number[], location: string) {
        const allEnemies = this.resolver.enemies.getEnemies()
        const enemiesToSend = enemies.map((enemy: number) => {
            return allEnemies.find((en: any) => {
                return en.id === enemy;
            });
        }).filter((enemy): enemy is Enemy => Boolean(enemy));

        if (!enemiesToSend) {
            throw new Error("Enemies not found");
        }

        const prevLocation = this.state.encounter.location.name;
        const locationToSend = this.resolver.locations.getLocations().find((loc: any) => {
            return loc.name === location;
        });
        if (!locationToSend) {
            throw new Error("Location not found");
        }
        this.state.updateEncounter(enemiesToSend, locationToSend)
        if (prevLocation !== locationToSend.name) {
            this.getMusic(this.state.battle !== null)
        }
    }

    public updateCharacterItems(userId: string, cell: number, item: Item) {
        this.state.updateCharacterItems(userId, cell, item).then(() => {
            this.logger.info("Items updated");
        });
    }

    public updateCharacterHealth(userId: string, health: number) {
        this.state.updateCharacterHealth(userId, health)
    }

    public setBattle(status: boolean) {
        this.getMusic(status);
        return this.state.setBattle(status);
    }
}

export default Game;
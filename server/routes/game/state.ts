import Bucket from "../../utils/bucket";
import winston from "winston";
import {logger} from "../../utils/logger";
import GameLocation from "../values/services/locations/location";
import locations from "../../data/locations.json";
import {Item} from "@types";
import Roles from "../values/services/roles/roles";
import Enemy from "../values/services/enemies/enemy";
import Battle from "./battle";
import DbHandler from "../../utils/db";
import characters from "../values/services/characters/characters";
import fs from "fs";


class State {
    private characters: { [key: string]: any };
    private bucket: Bucket;
    private db: DbHandler;
    private logger: winston.Logger;
    private status: boolean;
    private readonly locations: { [key: string]: GameLocation };
    private messages: string[];
    public encounter: { enemies: Enemy[], location: GameLocation };
    public battle: Battle | null;

    constructor() {
        this.bucket = new Bucket();
        this.db = new DbHandler();
        this.logger = logger;
        this.characters = {};
        this.status = false;
        this.locations = {};
        Object.values(locations).forEach((location: any) => {
            this.locations[location.name] = new GameLocation(
                location.name,
                location.description,
                location.image,
                location.map,
                location.musicCalm,
                location.musicBattle
            );
        });
        this.messages = [];
        this.encounter = {enemies: [], location: this.locations["Lobby"]};
        this.battle = null;
    }

    async save() {

        Object.keys(this.characters).forEach((key) => {
            const query = `UPDATE characters
                           SET hp = $1,
                               items = $2
                           WHERE user_id = $3`;
            const values = [this.characters[key].hp, JSON.stringify(this.characters[key].items), key];
            this.db.query(query, values).then(() => {
                this.logger.debug("Character updated successfully", {userId: key});
            });
        });


        const stateToSave = {
            status: this.status,
            messages: this.messages,
            encounter: this.encounter,
            battle: this.battle,
        }

        const response = await this.bucket.uploadFile(JSON.stringify(stateToSave), "state.json")
        if (response.status === 200) {
            this.logger.info("State saved successfully");
        } else {
            this.logger.error("Failed to save state");
            throw new Error("Failed to save state");
        }
    }

    async load() {
        const response = await this.bucket.getFile("state.json")
        if (!response.Body) {
            this.logger.error("File body is empty");
            throw new Error("File body is empty");
        }
        const data = JSON.parse(response.Body.toString('utf-8'))

        const query = `SELECT *
                       FROM characters
                       WHERE status = $1`;
        const values = [true];
        const result = await this.db.query(query, values);

        this.characters = {};

        if (!result) {
            this.logger.error("Failed to get character data");
            throw new Error("Failed to get character data");
        }

        if (result.rows.length == 0) {
            this.logger.error("User not found");
            throw new Error("User not found");
        }

        result.rows.forEach((characterData: any) => {
            console.log(characterData);
            this.characters[characterData.user_id] = {
                name: characterData.name,
                hp: characterData.hp,
                description: characterData.description,
                role: new Roles().getRoles().find((role: any) => role.name === characterData.role),
                imageName: characterData.image,
                items: JSON.parse(characterData.items)
            }
        });

        this.status = data.status;
        this.messages = data.messages;
        this.encounter = data.encounter;
        this.battle = this.initBattle(data.battle);
    }

    private initBattle(battleData: any) {
        if (!battleData) {
            return null;
        }
        const battle = new Battle(0, []);
        battle.setQueue(battleData.queue);
        battle.setTurn(battleData.turn);
        return battle;
    }

    public getCurrentLocation() {
        return this.encounter.location;
    }

    async addCharacter(character: string, userId: string) {

        const query = `SELECT *
                       FROM characters
                       WHERE user_id = $1`;
        const values = [userId];
        const result = await this.db.query(query, values);

        if (!result) {
            this.logger.error("Failed to get character data");
            throw new Error("Failed to get character data");
        }

        if (result.rows.length == 0) {
            this.logger.error("User not found");
            throw new Error("User not found");
        }
        const characterData = result.rows[0];
        this.characters[userId] = {
            name: characterData.name,
            hp: characterData.hp,
            description: characterData.description,
            role: new Roles().getRoles().find((role: any) => role.name === characterData.role),
            imageName: characterData.imageName,
            items: JSON.parse(characterData.items)
        }

    }

    async updateCharacterItems(userId: string, cell: number, item: Item) {
        this.characters[userId].items[cell] = item;
        this.save().then(() => {
            this.logger.info("Items updated successfully");
        });
    }

    public async getState() {

        const charactersToSend: {
            [key: string]: { name: string, hp: number, description: string, role: any, image: string, items: any[] }
        } = {}
        for (const key of Object.keys(this.characters)) {

            const signedUrl = await this.bucket.getSignedUrl(this.characters[key].imageName);

            charactersToSend[key] = {
                name: this.characters[key].name,
                hp: this.characters[key].hp,
                description: this.characters[key].description,
                role: this.characters[key].role,
                image: signedUrl,
                items: this.characters[key].items,
            }
        }

        const enemiesToSend = this.encounter.enemies.map((enemy) => {
            return {
                id: enemy.id,
                name: enemy.name,
                hp: enemy.hp,
                description: enemy.description,
                image: fs.readFileSync(enemy.image, 'base64'),
            }
        });

        const locationToSend = {
            name: this.encounter.location.name,
            description: this.encounter.location.description,
            image: fs.readFileSync(this.encounter.location.image, 'base64'),
            map: fs.readFileSync(this.encounter.location.map, 'base64'),
            musicCalm: this.encounter.location.musicCalm,
            musicBattle: this.encounter.location.musicBattle,
        }

        const encounterToSend = {
            enemies: enemiesToSend,
            location: locationToSend,
        }

        return {
            characters: charactersToSend,
            status: this.status,
            messages: this.messages,
            encounter: encounterToSend,
        }
    }

    public getItems(userId: string) {
        return this.characters[userId].items;
    }

    public getMessages() {
        return this.messages;
    }

    public getCharacterName(userId: string) {
        return this.characters[userId].name;
    }

    public addMessage(message: string) {
        if (this.messages.length > 20) {
            this.messages.shift();
        }
        this.messages.push(message);
    }

    public updateEncounter(enemies: Enemy[], location: GameLocation) {
        this.encounter.enemies = enemies;
        this.encounter.location = location;

        this.save().then(() => {
            this.logger.info("Encounter updated successfully");
        });
    }

    public updateCharacterHealth(userId: string, health: number) {
        this.characters[userId].hp = health;
        this.save().then(() => {
            this.logger.info("Health updated successfully");
        });
    }

    public deleteCharacter(userId: string) {
        delete this.characters[userId];
        this.save().then(() => {
            this.logger.info("Character deleted successfully");
        });
    }

    public setBattle(status: boolean) {
        this.status = status;
        if (!status) {
            this.battle = null;
        } else {
            this.battle = this.createBattle();
        }
        this.save().then(() => {
            this.logger.info("Battle status updated successfully");
        });

        console.log(this.battle);
        return this.battle;
    }

    public createBattle() {
        const keys = Object.keys(this.characters);
        console.log(keys);
        const queue = keys.map((key: string) => {
            return {id: key, player: true};
        });
        this.encounter.enemies.forEach((enemy) => {
            queue.push({id: enemy.id.toString(), player: false});
        });

        return new Battle(0, queue);
    }

    public makeTurn() {
        if (!this.battle) {
            this.logger.error("Battle is not started");
            throw new Error("Battle is not started");
        }
        const turn = this.battle.makeTurn();
        this.save().then(() => {
            this.logger.info("Turn made successfully");
        });
        return turn;
    }

}

export default State;
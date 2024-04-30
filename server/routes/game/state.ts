import Bucket from "../../utils/bucket";
import winston from "winston";
import {logger} from "../../utils/logger";
import GameLocation from "../values/services/locations/location";
import locations from "../../data/locations.json";
import {Item} from "@types";
import Roles from "../values/services/roles/roles";
import Enemy from "../values/services/enemies/enemy";
import Battle from "./battle";


class State {
    private characters: { [key: string]: any };
    private bucket: Bucket;
    private logger: winston.Logger;
    private status: boolean;
    private readonly locations: { [key: string]: GameLocation };
    private messages: string[];
    public encounter: { enemies: Enemy[], location: GameLocation };
    public battle: Battle | null;

    constructor() {
        this.bucket = new Bucket();
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
        this.encounter = { enemies: [], location: this.locations["Lobby"] };
        this.battle = null;
    }

    async save() {

        const stateToSave = {
            characters: this.characters,
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

        this.characters = {};

        Object.entries(data.characters).forEach(([key, character]) => {
            this.characters[key] = character;
        });
        this.status = data.status;
        this.messages = data.messages;
        this.encounter = data.encounter;
        this.battle = this.initBattle(data.battle);
    }

    private initBattle(battleData: any) {
        const battle = new Battle(0, []);
        battle.setQueue(battleData.queue);
        battle.setTurn(battleData.turn);
        return battle;
    }

    public getCurrentLocation() {
        return this.encounter.location;
    }

    async addCharacter(character: string, userId: string) {
        const fileName = `data-character-${character}.json`;
        const response = await this.bucket.getFile(fileName);
        if (!response.Body) {
            this.logger.error("File body is empty");
            throw new Error("File body is empty");
        }

        this.characters[userId] = JSON.parse(response.Body.toString('utf-8'));
        const roleName = this.characters[userId].role;
        this.characters[userId].role = new Roles().getRoles().find((role) => role.name === roleName);
        const image = await this.bucket.getFile(this.characters[userId].imageName);
        if (!image.Body) {
            this.logger.error("File body is empty");
            throw new Error("File body is empty");
        }
        this.characters[userId].image = image.Body.toString('base64');
        this.save().then(() => {
            this.logger.info("Character added successfully");
        });
    }

    async updateCharacterItems(userId: string, cell: number, item: Item) {
        this.characters[userId].items[cell] = item;
        this.save().then(() => {
            this.logger.info("Items updated successfully");
        });
    }

    public getState() {
        return {
            characters: this.characters,
            status: this.status,
            messages: this.messages,
            encounter: this.encounter,
        }
    }

    public addMessage(message: string) {
        if (this.messages.length > 20) {
            this.messages.shift();
        }
        this.messages.push(message);
        this.save().then(() => {
            this.logger.info("Message added successfully");
        });
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
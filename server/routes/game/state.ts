import Bucket from "../../utils/bucket";
import winston from "winston";
import {logger} from "../../utils/logger";
import GameLocation from "../values/services/locations/location";
import locations from "../../data/locations.json";
import {Item} from "@types";
import Roles from "../values/services/roles/roles";


class State {
    private characters: { [key: string]: any };
    private bucket: Bucket;
    private logger: winston.Logger;
    private status: boolean;
    private readonly locations: { [key: string]: GameLocation };
    private currentLocation: GameLocation;
    private messages: string[];

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
        this.currentLocation = this.locations["Lobby"];
        this.messages = [];
    }

    async save() {

        const stateToSave = {
            characters: this.characters,
            status: this.status,
            location: this.currentLocation,
            messages: this.messages,
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
        this.currentLocation = data.location;
        this.messages = data.messages;
    }

    public setLocation(locationName: string) {
        this.currentLocation = this.locations[locationName];
        this.save().then(() => {
            this.logger.info("Location set successfully");
        });
    }

    public getCurrentLocation() {
        return this.currentLocation;
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
            location: this.currentLocation,
            messages: this.messages,
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
}

export default State;
import Bucket from "../../utils/bucket";
import winston from "winston";
import {logger} from "../../utils/logger";
import GameLocation from "../values/services/locations/location";
import locations from "../../data/locations.json";


class State {
    private characters: { [key: string]: string };
    private bucket: Bucket;
    private logger: winston.Logger;
    private status: boolean;
    private readonly locations: { [key: string]: GameLocation };
    private currentLocation: GameLocation;

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
    }

    async save() {

        const stateToSave = {
            characters: this.characters,
            status: this.status,
            location: this.currentLocation,
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
            this.characters[key] = character as string;
        });
        this.status = data.status;
        this.currentLocation = data.location;
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

    public addCharacter(character: string, userId: string) {
        this.characters[userId] = character;
        this.save().then(() => {
            this.logger.info("Character added successfully");
        });
    }
}

export default State;
import Character from "../values/services/characters/character";
import Bucket from "../../utils/bucket";
import winston from "winston";
import { logger } from "../../utils/logger";


class State {
    private characters: { [key: string]: Character };
    private bucket: Bucket;
    private logger: winston.Logger;

    constructor() {
        this.bucket = new Bucket();
        this.logger = logger;
        this.characters = {};
    }

    async save() {

        const stateToSave = {
            characters: this.characters
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

        data.characters.forEach((key: string, character: Character) => {
            this.characters[key] = character;
        });
    }

    public addCharacter(character: Character) {
        this.characters[character.name] = character;
        this.save().then(() => {
            this.logger.info("Character added successfully");
        });
    }
}

export default State;
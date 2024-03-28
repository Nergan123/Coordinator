import { logger } from "../../utils/logger";
import State from "./state";
import winston from "winston";
import Character from "../values/services/characters/character";

class Game {
    private readonly state: State;
    private readonly logger: winston.Logger;

    constructor() {
        this.state = new State();
        this.logger = logger;
        try {
            this.state.load().then(() => {
                this.logger.info("State loaded successfully");
            });
        } catch (e) {
            console.error(e);
        }
    }

    public addCharacter(character: Character) {
        console.log(character);
        this.state.addCharacter(character);
    }

    public getState() {
        return this.state;
    }
}

export default Game;
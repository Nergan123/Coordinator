import { logger } from "../../utils/logger";
import State from "./state";
import winston from "winston";
import DbHandler from "../../utils/db";

class Game {
    private readonly state: State;
    private readonly logger: winston.Logger;
    private db: DbHandler;

    constructor() {
        this.state = new State();
        this.db = new DbHandler();
        this.logger = logger;
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
        this.state.addCharacter(character, userId);
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
        return this.state;
    }
}

export default Game;
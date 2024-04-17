import DbHandler from "../../utils/db";
import winston from "winston";
import Bucket from "../../utils/bucket";
import {logger} from "../../utils/logger";

class CreateCharacter {
    private db: DbHandler;
    private readonly tableName: string;
    private logger: winston.Logger;
    private bucket: Bucket;

    constructor() {
        this.db = new DbHandler();
        this.tableName = "Characters";
        this.logger = logger;
        this.bucket = new Bucket();
    }

    public createCharacter = async (req: any, res: any, name: string, description: string, role: string, image: Express.Multer.File, hp: number) => {
        const userName = req.user;
        const items = {
            1: {
                name: "ammo",
                quantity: 15
            },
            2: {
                name: "ammo",
                quantity: 15
            },
            3: {},
            4: {},
            5: {},
            6: {},
            7: {},
            8: {},
            9: {},
        }

        const dataFileName = "data-character-" + name + ".json";
        const dataToStore = {
            name: name,
            hp: hp,
            description: description,
            role: role,
            imageName: image.originalname,
            items: items
        };

        this.logger.info(`Creating character for user ${userName}`);
        const result = await this.bucket.uploadFile(JSON.stringify(dataToStore), dataFileName);
        this.logger.info(`Result status: ${result.status}`);
        if (result.status === 200) {
            await this.bucket.uploadFile(image.buffer, image.originalname);
            await this.saveCharacterToDb(req.user, dataToStore, dataFileName);
            res.status(200).send('Character data uploaded successfully');
        } else {
            this.logger.error('Failed to upload character data');
            res.status(500).send('Failed to upload character');
        }
    }

    public deleteCharacter = async (req: any, res: any, characterName: string) => {
        const query = `DELETE FROM ${this.tableName} WHERE name = $1 AND user_id = $2`;
        const values = [characterName, req.user.id];

        const result = await this.db.query(query, values);
        if (!result) {
            this.logger.error('Failed to delete character');
            res.status(500).send('Failed to delete character');
        }

        res.status(200).send('Character deleted successfully');
    }

    private async saveCharacterToDb(user: any, data: any, fileName: string) {
        const query = `INSERT INTO ${this.tableName} (user_id, name, path) VALUES ($1, $2, $3)`;
        const values = [user.id, data.name, fileName];

        await this.db.query(query, values);
    }
}

export default CreateCharacter;
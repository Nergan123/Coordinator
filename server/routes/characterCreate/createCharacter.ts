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

    public createCharacter = async (req: any, res: any, name: string, description: string, role: string, image: Express.Multer.File) => {
        const userName = req.user;

        const dataFileName = "data-character-" + name + ".json";
        const dataToStore = {
            name: name,
            description: description,
            role: role,
            imageName: image.originalname
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

    private async saveCharacterToDb(user: any, data: any, fileName: string) {
        const query = `INSERT INTO ${this.tableName} (user_id, name, path) VALUES ($1, $2, $3)`;
        const values = [user.id, data.name, fileName];

        await this.db.query(query, values);
    }
}

export default CreateCharacter;
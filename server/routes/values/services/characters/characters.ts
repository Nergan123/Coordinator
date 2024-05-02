import Character from "./character";
import DbHandler from "../../../../utils/db";
import Bucket from "../../../../utils/bucket";
import {CharacterData} from "@types";
import Role from "../roles/role";
import dataRoles from "../../../../data/roles.json";
import fs from "fs";

class Characters {

    private db: DbHandler;
    private bucket: Bucket;
    private readonly roles: Role[];

    constructor() {
        this.db = new DbHandler();
        this.bucket = new Bucket();
        this.roles = dataRoles.map((role: any) => {
            return new Role(role.id, role.name, role.stats, role.image, role.description, role.weapons,role.abilities);
        });
    }

    public async getCharactersFromDB(userId: string) {

        const query = `SELECT path FROM characters WHERE user_id = $1`;
        const values = [userId];
        const result = await this.db.query(query, values);

        if (!result) {
            throw new Error('Database query returned undefined');
        }

        return await Promise.all(result.rows.map(async (row: any) => {
            const response = await this.bucket.getFile(row.path);
            if (!response.Body) {
                throw new Error('File body is empty');
            }
            const data = JSON.parse(response.Body.toString('utf-8')) as CharacterData;
            const imageResponse = await this.bucket.getFile(data.imageName)
            const image = imageResponse.Body as Buffer;

            const role = this.roles.find(role => role.name === data.role) || this.roles[0];
            const roleToSend = {
                id: role.id,
                name: role.name,
                stats: role.stats,
                image: fs.readFileSync(role.image, 'base64'),
                description: role.description,
                weapons: role.weapons,
                abilities: role.abilities,
            };

            return new Character(data.name, data.description, roleToSend, image.toString('base64'));
        }));
    }

}

export default Characters;
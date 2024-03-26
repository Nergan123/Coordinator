import {Client} from "pg";
import loadEnv from "./loadEnv";

class DbHandler {

    private client: Client;

    constructor() {
        loadEnv();
        this.client = new Client(process.env.DATABASE_URL);
        this.client.connect().catch(err => console.error('Failed to connect to the database:', err));
    }

    async query(query: string, values: any[]) {
        try {
            return await this.client.query(query, values);
        } catch (err) {
            console.error("error executing query:", err);
        }
    }
}

export default DbHandler;
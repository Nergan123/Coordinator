import DbHandler from "../../utils/db";
import bcrypt from "bcryptjs";
import loadEnv from "../../utils/loadEnv";

class LoginHandler {
    private db: DbHandler;

    constructor() {
        loadEnv();
        this.db = new DbHandler();
    }

    public async login(login: string, password: string) {
        const query = 'SELECT * FROM users WHERE name = $1';
        const values = [login];

        const result = await this.db.query(query, values);

        if (result?.rows.length === 0) {
            return {token: null, status: 404};
        }

        const user = result?.rows[0];

        if (await bcrypt.compare(password, user.password)) {
            const token = await this.createToken(user);
            return {token: token, status: 200};
        }

        return {token: null, status: 401};
    }

    private async createToken(user: any) {
        const jwt = require('jsonwebtoken');

        const data = {
            id: user.id,
            name: user.name,
            role: user.role
        };

        return new Promise((resolve, reject) => {
            jwt.sign(data, process.env.SECRET_KEY, {expiresIn: '1w'}, (err: any, token: any) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(token);
            });
        });
    }

}

export default LoginHandler;
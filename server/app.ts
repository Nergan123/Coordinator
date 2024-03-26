import express, {Express} from "express";
import cors from "cors";
import * as fs from "fs";
import Resolver from "./routes/values/resolver";
import RegisterHandler from "./routes/register/registerHandler";
import loadEnv from "./utils/loadEnv";
import LoginHandler from "./routes/login/login";
import {logger} from "./utils/logger";
import winston from "winston";
import cookieParser from 'cookie-parser';
import verifyToken from "./middleWare/verifyToken";
import CreateCharacter from "./routes/characterCreate/createCharacter";
import multer from "multer";

const upload = multer();

export default class App {
    private app: Express;
    private resolver: Resolver;
    private registerHandler: RegisterHandler;
    private loginHandler: LoginHandler;
    private createCharacter: CreateCharacter;
    private logger: winston.Logger;

    constructor() {
        this.resolver = new Resolver();
        this.registerHandler = new RegisterHandler();
        this.loginHandler = new LoginHandler();
        this.createCharacter = new CreateCharacter();

        this.logger = logger;

        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(cookieParser());

        loadEnv();

        this.setEndPoints();
    }

    public listen(): void {
        this.app.listen(8000, () => {
            logger.info('Server is running on port 8000');
        });
    }

    private setEndPoints(): void {
        this.app.get('/', (req, res) => {
            res.send('Hello World From the Typescript Server!');
        });
        this.app.get('/api/game/state', verifyToken, (req, res) => {
            const image = fs.readFileSync('server/game/images/enemy.png', { encoding: 'base64' });
            res.send({
                state: "in-progress",
                image: image
            });
        });
        this.app.post('/api/values', verifyToken, (req, res) => {
            this.resolver.getValue(req).then((data) => {
                res.header('Content-Type', 'application/json');
                res.send(JSON.stringify(data));
            });
        });

        this.app.post('/api/register', async (req, res) => {
            const result = await this.registerHandler.register(req.body.login, req.body.password);
            res.sendStatus(result);
            res.send();
        });
        this.app.post('/api/login', async (req, res) => {
            const result = await this.loginHandler.login(req.body.login, req.body.password);
            res.cookie('token', result.token)
            res.status(result.status);
            res.send();
        });
        this.app.post( '/api/character-create', upload.any(), verifyToken, async (req, res) => {
            const { name, description, role } = req.body;
            if (!req.files) {
                res.status(400).send('No files were uploaded.');
                return;
            }
            let imageFile;
            if (Array.isArray(req.files)) {
                imageFile = req.files[0];
            } else {
                imageFile = req.files[Object.keys(req.files)[0]][0];
            }

            await this.createCharacter.createCharacter(req, res, name, description, role, imageFile);
        });
    }
}
import express, {Express} from "express";
import cors from "cors";
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
import Game from "./routes/game/game";

const upload = multer();

export default class App {
    private app: Express;
    private resolver: Resolver;
    private registerHandler: RegisterHandler;
    private loginHandler: LoginHandler;
    private createCharacter: CreateCharacter;
    private logger: winston.Logger;
    private game: Game;

    constructor() {
        this.resolver = new Resolver();
        this.registerHandler = new RegisterHandler();
        this.loginHandler = new LoginHandler();
        this.createCharacter = new CreateCharacter();
        this.game = new Game();

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
        this.app.post('/api/character-delete', verifyToken, async (req, res) => {
            const data = req.body;

            await this.createCharacter.deleteCharacter(req, res, data.characterName);
        });

        this.app.post('/api/game/add-character', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            this.game.addCharacter(req.body.character, req.user.id);

            res.sendStatus(200);
        });
        this.app.get('/api/game/location', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            res.send({location: this.game.state.getCurrentLocation()});
        });
        this.app.get('/api/game/state', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            res.send(this.game.getState());
        });
        this.app.post('/api/game/update-character-item', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            const userId = req.user.id;
            const cell = req.body.cell;
            const item = req.body.item;

            this.game.updateCharacterItems(userId, cell, item);
            res.sendStatus(200);
        });

        this.app.get('/api/user/role', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            const role = req.user.role;
            res.send({role: role});
        });
        this.app.get('/api/user/id', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            const id = req.user.id;
            res.send({id: id});
        });
    }
}
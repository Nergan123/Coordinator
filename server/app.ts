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
import {Server} from "socket.io";
import {createServer} from "http";
import path from "path";

const upload = multer();

export default class App {
    private readonly app: Express;
    private resolver: Resolver;
    private registerHandler: RegisterHandler;
    private loginHandler: LoginHandler;
    private createCharacter: CreateCharacter;
    private logger: winston.Logger;
    private game: Game;
    private socket: Server;
    private server: any;

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
        this.app.use(express.static('dist/build'));

        this.server = createServer(this.app);
        this.socket = new Server(this.server, {
            cors: {
                origin: "*", // Allow all origins
                methods: ["GET", "POST"], // Allow GET and POST methods
            }
        });

        loadEnv();

        this.setEndPoints();
        this.setSocket();
    }

    public listen(): void {
        this.server.listen(8000, () => {
            this.logger.info('Server is running on port 8000');
        });
    }

    private setSocket(): void {
        this.socket.on('connection', (socket) => {
            this.logger.info('a user connected');
        });
    }

    private setEndPoints(): void {
        this.app.get('/', (req, res) => {
            res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
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
        this.app.post('/api/character-create', upload.any(), verifyToken, async (req, res) => {
            const {name, description, role, hp} = req.body;
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

            await this.createCharacter.createCharacter(req, res, name, description, role, imageFile, hp);
        });
        this.app.post('/api/character-delete', verifyToken, async (req, res) => {
            const data = req.body;

            if (!req.user) {
                res.sendStatus(401);
                return;
            }

            await this.createCharacter.deleteCharacter(req, res, data.characterName);
            this.game.deleteCharacter(req.user.id);
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
        this.app.post('/api/game/update-encounter', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            const encounter = req.body.encounter;
            const prevLocation = this.game.state.getCurrentLocation();
            this.game.updateEncounter(encounter.enemies, encounter.location);
            res.sendStatus(200);
            const locationToSend = this.resolver.locations.getLocations().find((loc: any) => {
                return loc.name === encounter.location;
            });
            if (!locationToSend) {
                throw new Error("Location not found");
            }
            if (prevLocation !== encounter.location) {
                this.socket.emit("audio-updated");
            }
            this.socket.emit("update-encounter", locationToSend);
        });
        this.app.post('/api/game/update-character-item', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            const userId = req.body.userId;
            const cell = req.body.cell;
            const item = req.body.item;

            this.game.updateCharacterItems(userId, cell, item);
            res.sendStatus(200);

            this.socket.emit("update-character-items", {
                id: userId,
                items: this.game.state.getState().characters[userId].items
            });
        });
        this.app.post('/api/game/add-message', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            this.game.state.addMessage(req.body.message);
            this.socket.emit('message', this.game.state.getState().messages);
        });
        this.app.post('/api/game/update-character-health', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            const userId = req.body.userId;
            const health = req.body.health;
            this.game.updateCharacterHealth(userId, health);
            res.sendStatus(200);

            this.socket.emit("update-character-health", {
                name: this.game.state.getState().characters[userId].name,
                health: health,
            });
        });
        this.app.post('/api/game/battle', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            const prevStatus = (this.game.state.battle != null);
            const status = req.body.status;
            const output = this.game.setBattle(status);

            res.send({battle: output});
            this.socket.emit("battle", output);

            if (prevStatus !== status) {
                console.log("Audio updated");
                this.socket.emit("audio-updated");
            }

        });
        this.app.get('/api/game/battle', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            const battle = this.game.state.battle;
            res.send({battle: battle});
        });
        this.app.get('/api/game/next-turn', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            try {
                const turn = this.game.state.makeTurn();
                res.send({turn: turn});
                this.socket.emit("next-turn", turn);
            } catch (error) {
                res.status(400).send('Failed to make turn');
            }
        });
        this.app.post('/api/game/battle-remove-from-queue', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            const index = req.body.index;
            console.log(index);
            console.log(this.game.state.battle);
            if (this.game.state.battle == null) {
                res.sendStatus(400);
                return;
            }
            this.game.state.battle.removeFromQueue(index);
            console.log(this.game.state.battle);
            this.socket.emit("battle", this.game.state.battle);
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

        this.app.get('/api/audio/stream', verifyToken, (req, res) => {
            if (!req.user) {
                res.sendStatus(401);
                return;
            }
            try {
                res.set('Content-Type', 'audio/webm');
                const stream = this.game.audio.getStream();
                stream.pipe(res);
            } catch (error) {
                res.status(500).send('Failed to stream audio');
            }
        });

        this.app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
        });
    }
}
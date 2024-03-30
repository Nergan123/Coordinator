import {NextFunction, Request, Response} from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import loadEnv from "../utils/loadEnv";
import {logger} from "../utils/logger";
import {User} from "@types";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

loadEnv();

async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['token'];
    if (!token) {
        logger.error('A token is required for authentication');
        return res.status(403).send('A token is required for authentication');
    }
    try {
        logger.debug('Verifying token');
        const payload = jwt.verify(token, process.env.SECRET_KEY as Secret || 'default_secret');
        console.log(payload);
        if (typeof payload === "object" && "id" in payload) {
            req.user = payload as User;
        }
        logger.debug('Token verified');
        next();
    } catch (error) {
        logger.error('Invalid Token');
        return res.status(401).send('Invalid Token');
    }
}

export default verifyToken;
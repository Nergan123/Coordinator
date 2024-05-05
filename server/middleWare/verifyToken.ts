import {NextFunction, Request, Response} from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import {logger} from "../utils/logger";
import {User} from "@types";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const tokenCache = new Map<string, User>();

async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['token'];
    if (!token) {
        logger.error('A token is required for authentication');
        return res.status(403).send('A token is required for authentication');
    }
    try {
        logger.debug('Verifying token');
        let payload;
        if (tokenCache.has(token)) {
            payload = tokenCache.get(token);
        } else {
            payload = jwt.verify(token, process.env.SECRET_KEY as Secret || 'default_secret');
            if (typeof payload === "object" && "id" in payload) {
                tokenCache.set(token, payload as User);
            }
        }
        req.user = payload as User;
        logger.debug('Token verified');
        next();
    } catch (error) {
        logger.error('Invalid Token');
        return res.status(401).send('Invalid Token');
    }
}

export default verifyToken;
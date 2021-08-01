import jwt from "jsonwebtoken";
import config from "config";
import {NextFunction, Request, Response} from "express";

/**
 * Создаёт jwt-токен для пользователя.
 *
 * @param {string} userId Идентификатор пользователя.
 */
function createToken(userId: string) {
    const token = jwt.sign({userId}, config.get("jwtSecret"), {
        expiresIn: config.get("sessionExpiresIn"),
    });

    return token;
}

/**
 * Middleware функция, которая поверяет есть ли jwt-токен пользователя и прокидывает его дальше.
 */
function verifyToken(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

export {createToken, verifyToken};

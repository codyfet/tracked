import {NextFunction, Request, Response} from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import {TokenInterface} from "../interfaces/Token";
import User from "../models/User";

/**
 * Middleware функция, которая обогащает каждый private запрос данными залогиненного пользователя,
 * информацию о котором можно получить из токена, хранящегося в шапке запроса (req.headers.authorization).
 */
const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded: TokenInterface = jwt.verify(
                token,
                process.env.JWT_SECRET
            ) as TokenInterface;
            req.user = await User.findById(decoded.userId).select("password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

export {protect};

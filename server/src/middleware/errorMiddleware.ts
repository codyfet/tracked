import {IErrorResponse} from "../interfaces/Error";
import {NextFunction, Request, Response} from "express";

/**
 * Middleware функция, которая отсылает на ui ошибку 404 (Неверный маршрут).
 */
const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/**
 * Middleware функция, которая отсылает на ui ошибку в формате json.
 * Еще один хороший более подробный пример можно посмотреть здесь https://simonplend.com/how-to-create-an-error-handler-for-your-express-api/
 */
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const errorResponse: IErrorResponse = {
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    };

    res.status(statusCode);
    res.json(errorResponse);
    next();
};

export {notFound, errorHandler};

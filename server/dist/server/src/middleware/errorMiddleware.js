"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
/**
 * Middleware функция, которая отсылает на ui ошибку 404 (Неверный маршрут).
 */
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
/**
 * Middleware функция, которая отсылает на ui ошибку в формате json.
 * Еще один хороший более подробный пимер можно посмотреть здесь https://simonplend.com/how-to-create-an-error-handler-for-your-express-api/
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const errorResponse = {
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    };
    res.status(statusCode);
    res.json(errorResponse);
    next();
};
exports.errorHandler = errorHandler;

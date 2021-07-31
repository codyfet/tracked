const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * Создаёт jwt-токен для пользователя.
 *
 * @param {string} userId Идентификатор пользователя.
 */
function createToken(userId) {
    const token = jwt.sign({userId}, config.get("jwtSecret"), {
        expiresIn: config.get("sessionExpiresIn"),
    });

    return token;
}

/**
 * Middleware функция, которая поверяет есть ли jwt-токен пользователя и прокидывает его дальше.
 */
function verifyToken(req, res, next) {
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

module.exports = {
    createToken,
    verifyToken,
};

import jwt from "jsonwebtoken";

/**
 * Создаёт jwt-токен для пользователя.
 *
 * @param {string} userId Идентификатор пользователя.
 */
function createToken(userId: string) {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.SESSION_EXPIRES_IN,
    });

    return token;
}

export {createToken};

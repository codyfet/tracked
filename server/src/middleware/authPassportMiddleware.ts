import asyncHandler from "express-async-handler";
import passport from "passport";

/**
 * Middleware функция, основанная на passport, которая обогащает каждый запрос, для которого она используется, данными залогиненного пользователя,
 * информацию о котором можно получить из токена, хранящегося в шапке запроса (req.headers.authorization).
 *
 * Если токен невалиден, то возвращает 401 ошибку.
 *
 * Функция authenticate третьим параметром принимает коллбэк, который позволяет переопределить дефолтное поведение в случае успеха/неуспеха проверки токена
 * (по дефолту в случае ошибки authenticate возвращает 401 Unauthorized).
 * Так как коллбэк ожидает стандартные middleware аргументы, а здесь их у нас нет, то
 * мы делаем self invoked function которая вызовется в момент передачи в роутинг - чтобы эти параметры прокинулись в момент вызова функции (см. app.js).
 */

const passportProtect = asyncHandler(async function (req, res, next) {
    return passport.authenticate(
        "jwt",
        {
            session: false,
        },
        (err, user, info) => {
            if (err) {
                console.log("В passport.authenticate произошла ошибка", err);
                return next(err);
            }
            if (!user) {
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
            req.user = user;
            next();
        }
    )(req, res, next);
});

export {passportProtect};

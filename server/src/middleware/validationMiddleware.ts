import {check} from "express-validator";

/**
 * Валидация для сервиса регистрации пользователя.
 */
export const validationRegister = [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({min: 6}),
    check("username", "Введите имя пользователя").exists({checkFalsy: true}),
];

/**
 * Валидация для сервиса логина пользователя.
 */
export const validationLogin = [
    check("email", "Введите корректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists({checkFalsy: true}),
];

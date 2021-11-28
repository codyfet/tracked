"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationLogin = exports.validationRegister = void 0;
const express_validator_1 = require("express-validator");
/**
 * Валидация для сервиса регистрации пользователя.
 */
exports.validationRegister = [
    (0, express_validator_1.check)("email", "Некорректный email").isEmail(),
    (0, express_validator_1.check)("password", "Минимальная длина пароля 6 символов").isLength({ min: 6 }),
    (0, express_validator_1.check)("username", "Введите имя пользователя").exists({ checkFalsy: true }),
];
/**
 * Валидация для сервиса логина пользователя.
 */
exports.validationLogin = [
    (0, express_validator_1.check)("email", "Введите корректный email").normalizeEmail().isEmail(),
    (0, express_validator_1.check)("password", "Введите пароль").exists({ checkFalsy: true }),
];

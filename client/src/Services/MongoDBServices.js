import axios from "axios";

/**
 * Осуществляет попытку логина пользователя.
 *
 * @param {object} data Данные, введённые пользователем (логин/пароль).
 */
export function login(data) {
    return axios.post("/api/auth/login", data);
}

/**
 * Осуществляет попытку регистрации пользователя.
 *
 * @param {object} data Данные, введённые пользователем (логин/пароль).
 */
export function register(data) {
    return axios.post("/api/auth/register", data);
}

/**
 * Создаёт новую запись.
 *
 * @param {object} record Данные новой записи.
 */
export function createRecord(record) {
    return axios.post("/api/record/create", record);
}


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

/**
 * Изменяет запись.
 *
 * @param {string} recordId ObjectId идентификатор записи.
 * @param {object} fields Объект с измеёнными полями.
 */
export function updateRecord(recordId, fields) {
    return axios.put(`/api/record/${recordId}/update`, fields);
}

/**
 * Удаляет запись.
 *
 * @param {string} recordId ObjectId идентификатор записи.
 */
export function deleteRecord(recordId) {
    return axios.delete(`/api/record/${recordId}/delete`);
}

/**
 * Возвращает массив записей пользователя.
 *
 * @param {object} userId ObjectId пользователя, чьи записи извлекаем.
 */
export function getRecords(userId, options) {
    let params = {userId};

    if (options?.sortBy) {
        params.sortBy = options.sortBy;
    }

    return axios.get("/api/record", {params});
}

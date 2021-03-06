import axios from "axios";
import {TRACKED_USER_DATA} from "../Consts";

/**
 * Добавляет токен в каждый запрос.
 */
axios.interceptors.request.use(function (config) {
    const data = JSON.parse(localStorage.getItem(TRACKED_USER_DATA));

    if (data) {
        config.headers.Authorization = "Bearer " + data.token;
    }

    return config;
});

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
 * Возвращает данные пользователя.
 *
 * @param {object} data Данные, введённые пользователем (логин/пароль).
 */
export function getUserInfo(userId) {
    const params = {userId};

    return axios.get("/api/auth/user", {params});
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
 * Изменяет массив запись.
 *
 * @param {[{id, ...fieldsToUpdate}]} records Массив записей для изменения.
 */
export function updateRecords(records) {
    return axios.put("/api/record/update", records);
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

    if (options.sortBy) {
        params.sortBy = options.sortBy;
    }

    if (options.year) {
        params.year = options.year;
    }

    if (options.types) {
        params.types = options.types;
    }

    return axios.get("/api/record", {params});
}

/**
 * Возвращает объект со статистикой.
 *
 * @param {object} userId ObjectId пользователя, чьи записи извлекаем.
 * @param {number} year Выбранный год.
 */
export function getStat(userId, year) {
    const params = {userId, year};

    return axios.get("/api/stat", {params});
}

/**
 * Возвращает массив пользователей.
 *
 * @param {object} userId ObjectId пользователя, чьи записи извлекаем.
 * @param {number} limit Количество записей в одной пачке данных (по умолчанию 10).
 * @param {number} page Номер текущей пачки (по умолчанию 0).
 */
export function getUsers({userId, limit = 10, page = 0}) {
    const params = {userId, limit, page};

    return axios.get("/api/users", {params});
}

/**
 * Изменяет данные о пользователе.
 *
 * @param {string} userId ObjectId идентификатор записи.
 * @param {object} fields Объект с изменёнными полями.
 */
export function updateUser(userId, fields) {
    return axios.put(`/api/users/${userId}/update`, fields);
}

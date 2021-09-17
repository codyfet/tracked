import {
    IAuthUserRequestBody,
    IAuthUserResponseBody,
    IGetUserProfileQueryParams,
    IGetUserProfileResponseBody,
    IGetUsersQueryParams,
    IGetUsersResponseBody,
    IRegisterUserRequestBody,
    IRegisterUserResponseBody,
    IUpdateUserProfileRequestBody,
    IUpdateUserProfileResponseBody,
} from "./../../../server/src/controllers/user.controller";
import {ERecordType} from "./../Enums";
import {
    IClientRecord,
    IClientRecordsFilter,
    IPartialClientRecord,
} from "../Interfaces/ClientRecord";
import axios, {AxiosResponse} from "axios";
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
 * @param {IAuthUserRequestBody} data Данные, введённые пользователем (логин/пароль).
 */
export function login(data: IAuthUserRequestBody) {
    return axios.post<IAuthUserResponseBody>("/api/user/login", data);
}

/**
 * Осуществляет попытку регистрации пользователя.
 *
 * @param {IRegisterUserRequestBody} data Данные, введённые пользователем (логин/пароль).
 */
export function register(data: IRegisterUserRequestBody) {
    return axios.post<IRegisterUserResponseBody>("/api/user", data);
}

/**
 * Возвращает данные пользователя.
 * TODO: В текущей реализации userId не нужен? Ведь он передается в токене.
 *
 * @param {object} data Данные, введённые пользователем (логин/пароль).
 */
export function getUserInfo(userId: string) {
    const params: IGetUserProfileQueryParams = {userId};

    return axios.get<IGetUserProfileResponseBody>("/api/user/profile", {params});
}

/**
 * Создаёт новую запись.
 *
 * @param {IClientRecord} record Данные новой записи.
 */
export function createRecord(record: IClientRecord) {
    return axios.post("/api/record/create", record);
}

/**
 * Изменяет запись.
 *
 * @param {string} recordId ObjectId идентификатор записи.
 * @param {IPartialClientRecord} fields Объект с измеёнными полями.
 */
export function updateRecord(recordId: string, fields: IPartialClientRecord) {
    return axios.put(`/api/record/${recordId}/update`, fields);
}

/**
 * Изменяет массив запись.
 *
 * @param {Pick<IClientRecord, "_id" | "position" | "viewdate" | "userId">[]} records Массив записей для изменения.
 */
export function updateRecords(
    records: Pick<IClientRecord, "_id" | "position" | "viewdate" | "userId">[]
) {
    return axios.put("/api/record/update", records);
}

/**
 * Удаляет запись.
 *
 * @param {string} recordId ObjectId идентификатор записи.
 */
export function deleteRecord(recordId: string) {
    return axios.delete(`/api/record/${recordId}/delete`);
}

/**
 * Возвращает массив записей пользователя.
 *
 * @param {object} userId ObjectId пользователя, чьи записи извлекаем.
 */
export function getRecords(
    userId: string,
    options: IClientRecordsFilter
): Promise<AxiosResponse<IClientRecord[]>> {
    const params: {userId: string; sortBy?: string; year?: number; types?: ERecordType[]} = {
        userId,
    };

    if (options.sortBy) {
        params.sortBy = options.sortBy;
    }

    if (options.year) {
        params.year = options.year;
    }

    if (options.types) {
        params.types = options.types;
    }

    return axios.get<IClientRecord[]>("/api/record", {params});
}

/**
 * Возвращает объект со статистикой.
 *
 * @param {string} userId ObjectId пользователя, чьи записи извлекаем.
 * @param {number} year Выбранный год.
 */
export function getStat(userId: string, year: number) {
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
export function getUsers({userId, limit = 10, page = 0}: IGetUsersQueryParams) {
    const params = {userId, limit, page};

    return axios.get<IGetUsersResponseBody>("/api/user", {params});
}

/**
 * Изменяет данные пользователя (который залогинен).
 *
 * @param {IUpdateUserProfileRequestBody} fields Объект с изменёнными полями.
 */
export function updateUser(fields: IUpdateUserProfileRequestBody) {
    return axios.put<IUpdateUserProfileResponseBody>("/api/user/profile", fields);
}

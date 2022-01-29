import {IErrorDataObject} from "./../Interfaces/Common";
import {IErrorResponse} from "../../../server/src/Interfaces/Error";
import {
    IClientRecord,
    IClientRecordsFilter,
    IPartialClientRecord,
} from "../Interfaces/ClientRecord";
import {
    ADD_RECORD_FAILURE,
    ADD_RECORD_START,
    ADD_RECORD_SUCCESS,
    AUTHENTICATION_CLEAR,
    AUTHENTICATION_FAILURE,
    AUTHENTICATION_START,
    AUTHENTICATION_SUCCESS,
    DELETE_RECORD_FAILURE,
    DELETE_RECORD_START,
    DELETE_RECORD_SUCCESS,
    GET_RECORDS_FAILURE,
    GET_RECORDS_START,
    GET_RECORDS_SUCCESS,
    GET_STAT_FAILURE,
    GET_STAT_START,
    GET_STAT_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_START,
    GET_USERS_SUCCESS,
    POPULATE_MOVIES_AUTOSUGGEST_FAILURE,
    POPULATE_MOVIES_AUTOSUGGEST_START,
    POPULATE_MOVIES_AUTOSUGGEST_SUCCESS,
    POPULATE_TV_AUTOSUGGEST_FAILURE,
    POPULATE_TV_AUTOSUGGEST_START,
    POPULATE_TV_AUTOSUGGEST_SUCCESS,
    UPDATE_RECORD_FAILURE,
    UPDATE_RECORD_START,
    UPDATE_RECORD_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_START,
    UPDATE_USER_SUCCESS,
} from "./ActionTypes";
import {
    getMovieCreditsById,
    getMovieDetailsById,
    getTvSeriesDetailsById,
    searchMoviesByTitle,
    searchTvSeriesByTitle,
} from "../Services/TMDBServices";
import {
    createRecord as tryCreateRecord,
    deleteRecord as tryDeleteRecord,
    getRecords as tryGetRecords,
    getStat as tryGetStat,
    getUserInfo as tryGetUserInfo,
    getUsers as tryGetUsers,
    login as tryLogin,
    register as tryRegister,
    updateRecord as tryUpdateRecord,
    updateRecords as tryUpdateRecords,
    updateUser as tryUpdateUser,
    vkAuthenticate as tryVkAuthenticate,
} from "../Services/MongoDBServices";
import {TRACKED_USER_DATA} from "../Consts";
import {createRecordForMovie, createRecordForTVSeries} from "../Models/Record";
import {Dispatch} from "redux";
import {IPartialClientUser} from "../Interfaces/User";
import {AxiosResponse} from "axios";

/**
 * Thunk функция для выполнения ajax запроса для поиска фильмов.
 *
 * @param {string} searchInput Значение, по которому будет осуществляться поиск.
 */
export function searchMovies(searchInput: string): Function {
    return function (dispatch: Dispatch) {
        dispatch({type: POPULATE_MOVIES_AUTOSUGGEST_START});

        return searchMoviesByTitle(searchInput).then(
            (result) =>
                dispatch({
                    type: POPULATE_MOVIES_AUTOSUGGEST_SUCCESS,
                    payload: result,
                }),
            (error) =>
                dispatch({
                    type: POPULATE_MOVIES_AUTOSUGGEST_FAILURE,
                    payload: error,
                })
        );
    };
}

/**
 * Thunk функция для выполнения ajax запроса для поиска сериалов.
 *
 * @param {string} searchInput Значение, по которому будет осуществляться поиск.
 */
export function searchTvSeries(searchInput: string) {
    return function (dispatch: Dispatch) {
        dispatch({type: POPULATE_TV_AUTOSUGGEST_START});

        return searchTvSeriesByTitle(searchInput).then(
            (result) =>
                dispatch({
                    type: POPULATE_TV_AUTOSUGGEST_SUCCESS,
                    payload: result,
                    meta: {
                        debounce: {
                            time: 300,
                            leading: false,
                        },
                    },
                }),
            (error) =>
                dispatch({
                    type: POPULATE_TV_AUTOSUGGEST_FAILURE,
                    payload: error,
                })
        );
    };
}

/**
 * Thunk функция для выполнения ajax запроса для получения полной информации о фильме.
 *
 * @param {number} id TMDb идентификатор фильма.
 * @param {ObjectId} userId Идентификатор пользователя.
 */
export function addDetailedMovieRecord(id: number, userId: string) {
    return async function (dispatch: Dispatch) {
        dispatch({type: ADD_RECORD_START});

        try {
            const [detailsResponse, creditsResponse] = await Promise.all([
                getMovieDetailsById(id),
                getMovieCreditsById(id),
            ]);
            const newRecord = createRecordForMovie(
                userId,
                detailsResponse.data,
                creditsResponse.data
            );
            const result = await tryCreateRecord(newRecord);
            dispatch({type: ADD_RECORD_SUCCESS, payload: result.data});
        } catch (error) {
            dispatch({type: ADD_RECORD_FAILURE, payload: error});
            throw error;
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для получения полной информации о сериале.
 *
 * @param {number} id TMDb идентификатор сериала.
 * @param {ObjectId} userId Идентификатор пользователя.
 */
export function addDetailedTvSeriesRecord(id: number, userId: string) {
    return async function (dispatch: Dispatch) {
        dispatch({type: ADD_RECORD_START});

        try {
            const detailsResponse = await getTvSeriesDetailsById(id);
            const newRecord = createRecordForTVSeries(userId, detailsResponse.data);
            const result = await tryCreateRecord(newRecord);
            dispatch({type: ADD_RECORD_SUCCESS, payload: result.data});
        } catch (error) {
            dispatch({type: ADD_RECORD_FAILURE, payload: error});
            throw error;
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для получения полной информации о фильме.
 *
 * @param {string} recordId ObjectId идентификатор записи.
 * @param {IPartialClientRecord} fields Объект с изменёнными полями.
 */
export function updateRecord(recordId: string, fields: IPartialClientRecord) {
    return async function (dispatch: Dispatch) {
        dispatch({type: UPDATE_RECORD_START});

        try {
            const result = await tryUpdateRecord(recordId, fields);
            dispatch({type: UPDATE_RECORD_SUCCESS, payload: result});
            return result;
        } catch (error) {
            dispatch({type: UPDATE_RECORD_FAILURE, payload: error});
            throw error;
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для обновления массива записей.
 *
 * @param {Pick<IClientRecord, "_id" | "position" | "viewdate" | "userId">[]} records Массив записей.
 */
export function updateRecords(
    records: Pick<IClientRecord, "_id" | "position" | "viewdate" | "userId">[]
) {
    return async function (dispatch: Dispatch) {
        dispatch({type: GET_RECORDS_START});

        try {
            const result = await tryUpdateRecords(records);
            dispatch({type: GET_RECORDS_SUCCESS, payload: result.data});
            return result;
        } catch (error) {
            dispatch({type: GET_RECORDS_FAILURE, payload: error});
            throw error;
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для получения полной информации о фильме.
 *
 * @param {string} recordId ObjectId идентификатор записи.
 */
export function deleteRecord(recordId: string) {
    return async function (dispatch: Dispatch) {
        dispatch({type: DELETE_RECORD_START});

        try {
            await tryDeleteRecord(recordId);
            dispatch({type: DELETE_RECORD_SUCCESS, payload: recordId});
        } catch (error) {
            dispatch({type: DELETE_RECORD_FAILURE, payload: error});
            throw error;
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для получения списка записей пользователя.
 *
 * @param {ObjectId} userId Идентификатор пользователя.
 */
export function getRecords(userId: string, options: IClientRecordsFilter) {
    return async function (dispatch: Dispatch) {
        dispatch({type: GET_RECORDS_START});

        try {
            const records = await tryGetRecords(userId, options);
            dispatch({type: GET_RECORDS_SUCCESS, payload: records.data});
        } catch (error: any) {
            const response: AxiosResponse<IErrorResponse> = error.response;
            const message: string = response?.data.message ?? error.message;
            const status: number = response?.status ?? error.status;
            const errorObject: IErrorDataObject = {
                message,
                status,
            };
            dispatch({type: GET_RECORDS_FAILURE, payload: errorObject});
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для получения статистики записей пользователя.
 *
 * @param {ObjectId} userId Идентификатор пользователя.
 * @param {number} year Выбраннй год.
 */
export function getStat(userId: string, year: number) {
    return async function (dispatch: Dispatch) {
        dispatch({type: GET_STAT_START});

        try {
            const statResponse = await tryGetStat(userId, year);
            dispatch({type: GET_STAT_SUCCESS, payload: statResponse});
            return statResponse;
        } catch (error) {
            dispatch({type: GET_STAT_FAILURE, payload: error});
            throw error;
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для авторизации пользователя через вк виджет
 */
export function vkAuthenticate({
    vkId,
    username,
    image,
}: {
    vkId: number;
    username: string;
    image: string;
}) {
    return async function (dispatch: Dispatch) {
        dispatch({type: AUTHENTICATION_START});

        try {
            const response = await tryVkAuthenticate({vkId, username, image});

            dispatch({type: AUTHENTICATION_SUCCESS, payload: response.data});
            /**
             * Складываем данные пользователя в локал сторедж.
             */
            localStorage.setItem(
                TRACKED_USER_DATA,
                JSON.stringify({
                    userId: response.data.userId,
                    token: response.data.token,
                })
            );

            return response;
        } catch (error: any) {
            const response: AxiosResponse<IErrorResponse> = error.response;
            const message: string = response?.data.message ?? error.message;
            const status: number = response?.status ?? error.status;
            const errorObject: IErrorDataObject = {
                message,
                status,
            };
            dispatch({type: AUTHENTICATION_FAILURE, payload: errorObject});
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для логина пользователя.
 */
export function login({email, password}: {email: string; password: string}) {
    return async function (dispatch: Dispatch) {
        dispatch({type: AUTHENTICATION_START});

        try {
            const response = await tryLogin({email, password});
            dispatch({type: AUTHENTICATION_SUCCESS, payload: response.data});
            /**
             * Складываем данные пользователя в локал сторедж.
             */
            localStorage.setItem(
                TRACKED_USER_DATA,
                JSON.stringify({
                    userId: response.data.userId,
                    token: response.data.token,
                })
            );

            return response;
        } catch (error: any) {
            const response: AxiosResponse<IErrorResponse> = error.response;
            const message: string = response?.data.message ?? error.message;
            const status: number = response?.status ?? error.status;
            const errorObject: IErrorDataObject = {
                message,
                status,
            };
            dispatch({type: AUTHENTICATION_FAILURE, payload: errorObject});
        }
    };
}

/**
 * Экшен криэйтор для выполнения действия логаут пользователя.
 */
export function logout() {
    /**
     * Удаляем данные пользователя из локал сторедж.
     */
    localStorage.removeItem(TRACKED_USER_DATA);

    return {
        type: AUTHENTICATION_CLEAR,
    };
}

/**
 * Thunk функция для выполнения ajax запроса для регистрации пользователя.
 */
export function register({
    email,
    password,
    username,
}: {
    email: string;
    password: string;
    username: string;
}) {
    return async function (dispatch: Dispatch) {
        dispatch({type: AUTHENTICATION_START});

        try {
            const response = await tryRegister({email, password, username});
            dispatch({type: AUTHENTICATION_SUCCESS, payload: response.data});

            /**
             * Складываем данные пользователя в локал сторедж.
             */
            localStorage.setItem(
                TRACKED_USER_DATA,
                JSON.stringify({
                    userId: response.data.userId,
                    token: response.data.token,
                })
            );

            return response;
        } catch (error: any) {
            const response: AxiosResponse<IErrorResponse> = error.response;
            const message: string = response?.data.message ?? error.message;
            const status: number = response?.status ?? error.status;
            const errorObject: IErrorDataObject = {
                message,
                status,
            };
            dispatch({type: AUTHENTICATION_FAILURE, payload: errorObject});
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для получения информации о пользователе.
 */
export function getUserInfo(userId: string) {
    return async function (dispatch: Dispatch) {
        dispatch({type: AUTHENTICATION_START});

        try {
            const response = await tryGetUserInfo(userId);
            dispatch({type: AUTHENTICATION_SUCCESS, payload: response.data});
            return response;
        } catch (error: any) {
            const response: AxiosResponse<IErrorResponse> = error.response;
            const message: string = response?.data.message ?? error.message;
            const status: number = response?.status ?? error.status;
            const errorObject: IErrorDataObject = {
                message,
                status,
            };
            dispatch({type: AUTHENTICATION_FAILURE, payload: errorObject});
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для получения информации о пользователе.
 *
 * @param {string} userId ObjectId идентификатор записи (если не передать, вернутся все записи).
 * @param {number} page Номер запрашиваемой страницы.
 */
export function getUsers({userId, page}: {userId?: string; page?: number}) {
    return async function (dispatch: Dispatch) {
        dispatch({type: GET_USERS_START});

        try {
            const response = await tryGetUsers({userId, page});
            dispatch({type: GET_USERS_SUCCESS, payload: response.data});
            return response;
        } catch (error) {
            dispatch({type: GET_USERS_FAILURE, payload: error});
            throw error;
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для изменения данных о пользователе.
 *
 * @param {IPartialClientUser} fields Объект с изменёнными полями.
 */
export function updateUser(fields: IPartialClientUser) {
    return async function (dispatch: Dispatch) {
        dispatch({type: UPDATE_USER_START});

        try {
            const result = await tryUpdateUser(fields);
            dispatch({type: UPDATE_USER_SUCCESS, payload: result.data});
            return result;
        } catch (error) {
            dispatch({type: UPDATE_USER_FAILURE, payload: error});
            throw error;
        }
    };
}

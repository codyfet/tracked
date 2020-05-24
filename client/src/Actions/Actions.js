import {
    ADD_MOVIE_DETAILED_RECORD_FAILURE,
    ADD_MOVIE_DETAILED_RECORD_START,
    ADD_MOVIE_DETAILED_RECORD_SUCCESS,
    ADD_TVSERIES_DETAILED_RECORD_FAILURE,
    ADD_TVSERIES_DETAILED_RECORD_START,
    ADD_TVSERIES_DETAILED_RECORD_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT,
    POPULATE_MOVIES_AUTOSUGGEST_FAILURE,
    POPULATE_MOVIES_AUTOSUGGEST_START,
    POPULATE_MOVIES_AUTOSUGGEST_SUCCESS,
    POPULATE_TV_AUTOSUGGEST_FAILURE,
    POPULATE_TV_AUTOSUGGEST_START,
    POPULATE_TV_AUTOSUGGEST_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_START,
    REGISTER_SUCCESS,
} from "./ActionTypes";
import {
    getMovieCreditsById,
    getMovieDetailsById,
    getTvSeriesDetailsById,
    searchMoviesByTitle,
    searchTvSeriesByTitle
} from "../Services/TMDBServices";
import {login as tryLogin, register as tryRegister} from "../Services/MongoDBServices";
import {TRACKED_USER_DATA} from "../Consts";

/**
 * Thunk функция для выполнения ajax запроса для поиска фильмов.
 *
 * @param {string} searchInput Значение, по которому будет осуществляться поиск.
 */
export function searchMovies(searchInput) {
    return function (dispatch) {
        dispatch({type: POPULATE_MOVIES_AUTOSUGGEST_START});

        return searchMoviesByTitle(searchInput).then(
            (result) => dispatch({type: POPULATE_MOVIES_AUTOSUGGEST_SUCCESS, payload: result}),
            (error) => dispatch({type: POPULATE_MOVIES_AUTOSUGGEST_FAILURE, payload: error}),
        );
    };
}

/**
 * Thunk функция для выполнения ajax запроса для поиска сериалов.
 *
 * @param {string} searchInput Значение, по которому будет осуществляться поиск.
 */
export function searchTvSeries(searchInput) {
    return function (dispatch) {
        dispatch({type: POPULATE_TV_AUTOSUGGEST_START});

        return searchTvSeriesByTitle(searchInput).then(
            (result) => dispatch({type: POPULATE_TV_AUTOSUGGEST_SUCCESS, payload: result}),
            (error) => dispatch({type: POPULATE_TV_AUTOSUGGEST_FAILURE, payload: error}),
        );
    };
}

/**
 * Thunk функция для выполнения ajax запроса для получения полной информации о фильме.
 */
export function addDetailedMovieRecord(id) {
    return async function (dispatch) {
        dispatch({type: ADD_MOVIE_DETAILED_RECORD_START});

        try {
            const results = await Promise.all([getMovieDetailsById(id), getMovieCreditsById(id)]);
            dispatch({type: ADD_MOVIE_DETAILED_RECORD_SUCCESS, payload: results});
            return results;
        } catch (error) {
            dispatch({type: ADD_MOVIE_DETAILED_RECORD_FAILURE, payload: error});
            throw error;
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для получения полной информации о сериале.
 */
export function addDetailedTvSeriesRecord(id) {
    return async function (dispatch) {
        dispatch({type: ADD_TVSERIES_DETAILED_RECORD_START});

        try {
            const results = await getTvSeriesDetailsById(id);
            dispatch({type: ADD_TVSERIES_DETAILED_RECORD_SUCCESS, payload: results});
            return results;
        } catch (error) {
            dispatch({type: ADD_TVSERIES_DETAILED_RECORD_FAILURE, payload: error});
            throw error;
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для логина пользователя.
 */
export function login({email, password}) {
    return async function (dispatch) {
        dispatch({type: LOGIN_START});

        try {
            const response = await tryLogin({email, password});
            dispatch({type: LOGIN_SUCCESS, payload: response});
            /**
             * Складываем данные пользователя в локал сторедж.
             */
            localStorage.setItem(TRACKED_USER_DATA, JSON.stringify({userId: response.data.userId, token: response.data.token}));

            return response;
        } catch (error) {
            dispatch({type: LOGIN_FAILURE, payload: error});
            throw error;
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
        type: LOGOUT
    };
}

/**
 * Thunk функция для выполнения ajax запроса для логина пользователя.
 */
export function register({email, password}) {
    return async function (dispatch) {
        dispatch({type: REGISTER_START});

        try {
            const response = await tryRegister({email, password});
            dispatch({type: REGISTER_SUCCESS, payload: response});
            return response;
        } catch (error) {
            dispatch({type: REGISTER_FAILURE, payload: error});
            throw error;
        }
    };
}
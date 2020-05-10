import {
    GET_GENRES_FAILURE,
    GET_GENRES_START,
    GET_GENRES_SUCCESS,
    POPULATE_AUTOSUGGEST_FAILURE,
    POPULATE_AUTOSUGGEST_START,
    POPULATE_AUTOSUGGEST_SUCCESS,
} from './ActionTypes';
import {getGenresFromTMDb, searchMoviesByTitle} from '../Services/TMDBServices';

/**
 * Thunk функция для выполнения ajax запроса для поиска фильмов.
 *
 * @param {string} searchInput Значение, по которому будет осуществляться поиск.
 */
export function searchMovies(searchInput) {
    return function (dispatch) {

        dispatch({type: POPULATE_AUTOSUGGEST_START});

        return searchMoviesByTitle(searchInput).then(
            (result) => dispatch({type: POPULATE_AUTOSUGGEST_SUCCESS, payload: result}),
            (error) => dispatch({type: POPULATE_AUTOSUGGEST_FAILURE, payload: error}),
        );
    };
}

/**
 * Thunk функция для выполнения ajax запроса для получения справочника жанров.
 */
export function getGenres() {
    return function (dispatch) {

        dispatch({type: GET_GENRES_START});

        return getGenresFromTMDb().then(
            (result) => dispatch({type: GET_GENRES_SUCCESS, payload: result}),
            (error) => dispatch({type: GET_GENRES_FAILURE, payload: error}),
        );
    };
}
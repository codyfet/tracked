import {
    ADD_MOVIE_DETAILED_RECORD_FAILURE,
    ADD_MOVIE_DETAILED_RECORD_START,
    ADD_MOVIE_DETAILED_RECORD_SUCCESS,
    ADD_TVSERIES_DETAILED_RECORD_FAILURE,
    ADD_TVSERIES_DETAILED_RECORD_START,
    ADD_TVSERIES_DETAILED_RECORD_SUCCESS,
    POPULATE_MOVIES_AUTOSUGGEST_FAILURE,
    POPULATE_MOVIES_AUTOSUGGEST_START,
    POPULATE_MOVIES_AUTOSUGGEST_SUCCESS,
    POPULATE_TV_AUTOSUGGEST_FAILURE,
    POPULATE_TV_AUTOSUGGEST_START,
    POPULATE_TV_AUTOSUGGEST_SUCCESS,
} from "./ActionTypes";
import {
    getMovieCreditsById,
    getMovieDetailsById,
    getTvSeriesDetailsById,
    searchMoviesByTitle,
    searchTvSeriesByTitle
} from "../Services/TMDBServices";

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
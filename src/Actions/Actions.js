import {
    ADD_DETAILED_RECORD_FAILURE,
    ADD_DETAILED_RECORD_START,
    ADD_DETAILED_RECORD_SUCCESS,
    POPULATE_AUTOSUGGEST_FAILURE,
    POPULATE_AUTOSUGGEST_START,
    POPULATE_AUTOSUGGEST_SUCCESS,
} from './ActionTypes';
import {getMovieCreditsById, getMovieDetailsById, searchMoviesByTitle} from '../Services/TMDBServices';

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
 * Thunk функция для выполнения ajax запроса для получения полной информации о фильме.
 */
export function addDetailedRecord(id) {
    return async function (dispatch) {

        dispatch({type: ADD_DETAILED_RECORD_START});

        try {
            const results = await Promise.all([getMovieDetailsById(id), getMovieCreditsById(id)]);
            dispatch({type: ADD_DETAILED_RECORD_SUCCESS, payload: results});
            return results;
        } catch (error) {
            dispatch({type: ADD_DETAILED_RECORD_FAILURE, payload: error});
            throw error;
        }

    };
}
import {
    POPULATE_AUTOSUGGEST_FAILURE,
    POPULATE_AUTOSUGGEST_START,
    POPULATE_AUTOSUGGEST_SUCCESS
} from './ActionTypes';
import {searchMoviesByTitle} from '../Services/TMDBServices';

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
import {
    ADD_RECORD_SUCCESS,
    POPULATE_MOVIES_AUTOSUGGEST_FAILURE,
    POPULATE_MOVIES_AUTOSUGGEST_START,
    POPULATE_MOVIES_AUTOSUGGEST_SUCCESS,
    POPULATE_TV_AUTOSUGGEST_FAILURE,
    POPULATE_TV_AUTOSUGGEST_START,
    POPULATE_TV_AUTOSUGGEST_SUCCESS,
    REMOVE_RECORD,
} from "../Actions/ActionTypes";

/**
 * Редюсер для узла "emptyRecord".
 */
export default function emptyRecord(state = {records: []}, action) {
    switch (action.type) {
        case POPULATE_MOVIES_AUTOSUGGEST_START:
            return state;
        case POPULATE_MOVIES_AUTOSUGGEST_SUCCESS:
            return {
                records: action.payload.data.results
            };
        case POPULATE_MOVIES_AUTOSUGGEST_FAILURE:
            return state;
        case POPULATE_TV_AUTOSUGGEST_START:
            return state;
        case POPULATE_TV_AUTOSUGGEST_SUCCESS:
            return {
                records: action.payload.data.results
            };
        case POPULATE_TV_AUTOSUGGEST_FAILURE:
            return state;
        case REMOVE_RECORD:
            return {
                records: []
            };
        case ADD_RECORD_SUCCESS:
            return {
                records: []
            };
        default:
            return state;
    }
}

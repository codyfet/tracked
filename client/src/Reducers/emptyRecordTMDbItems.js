import {
    ADD_RECORD_SUCCESS,
    POPULATE_MOVIES_AUTOSUGGEST_FAILURE,
    POPULATE_MOVIES_AUTOSUGGEST_START,
    POPULATE_MOVIES_AUTOSUGGEST_SUCCESS,
    POPULATE_TV_AUTOSUGGEST_FAILURE,
    POPULATE_TV_AUTOSUGGEST_START,
    POPULATE_TV_AUTOSUGGEST_SUCCESS,
} from "../Actions/ActionTypes";

/**
 * Редюсер для узла "emptyRecordTMDbItems".
 */
export default function emptyRecordTMDbItems(state = [], action) {
    switch (action.type) {
        case POPULATE_MOVIES_AUTOSUGGEST_START:
            return state;
        case POPULATE_MOVIES_AUTOSUGGEST_SUCCESS:
            return action.payload.data.results;
        case POPULATE_MOVIES_AUTOSUGGEST_FAILURE:
            return state;
        case POPULATE_TV_AUTOSUGGEST_START:
            return state;
        case POPULATE_TV_AUTOSUGGEST_SUCCESS:
            return action.payload.data.results;
        case POPULATE_TV_AUTOSUGGEST_FAILURE:
            return state;
        case ADD_RECORD_SUCCESS:
            return [];
        default:
            return state;
    }
}

import {filter, findIndex} from "lodash";
import {
    ADD_EMPTY_MOVIE_RECORD,
    ADD_EMPTY_TVSERIES_RECORD,
    ADD_RECORD_SUCCESS,
    AUTHENTICATION_CLEAR,
    AUTHENTICATION_FAILURE,
    AUTHENTICATION_START,
    AUTHENTICATION_SUCCESS,
    ORDER_RECORDS_BY,
    POPULATE_MOVIES_AUTOSUGGEST_FAILURE,
    POPULATE_MOVIES_AUTOSUGGEST_START,
    POPULATE_MOVIES_AUTOSUGGEST_SUCCESS,
    POPULATE_TV_AUTOSUGGEST_FAILURE,
    POPULATE_TV_AUTOSUGGEST_START,
    POPULATE_TV_AUTOSUGGEST_SUCCESS,
    REMOVE_RECORD,
    UPDATE_RECORD,
} from "../Actions/ActionTypes";
import {createEmptyRecord, getInitialAsyncContainer} from "../Utils/Utils";

const initialState = {
    user: getInitialAsyncContainer(),
    records: [],
    emptyRecord: {
        records: []
    }
};

/**
 * Корневой редюсер.
 */
export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_RECORD:
            return {
                ...state,
                records: filter(state.records, (record) => record.id !== action.payload.id),
                emptyRecord: {
                    records: [],
                }
            };
        case ADD_EMPTY_MOVIE_RECORD:
            return {
                ...state,
                records: [{...createEmptyRecord(), type: "movie"}, ...state.records],
                emptyRecord: {
                    ...state.emptyRecord,
                }
            };
        case ADD_EMPTY_TVSERIES_RECORD:
            return {
                ...state,
                records: [{...createEmptyRecord(), type: "tvseries"}, ...state.records],
                emptyRecord: {
                    ...state.emptyRecord,
                }
            };
        case ADD_RECORD_SUCCESS:
            const newRecords = [action.payload];

            for (let i = 1; i < (state.records.length); i++) {
                newRecords.push(state.records[i]);
            }

            return {
                ...state,
                records: newRecords,
                emptyRecord: {
                    records: [],
                }
            };
        case UPDATE_RECORD:
            const recordIndex = findIndex(state.records, {id: action.payload.id});
            const updatedRecord = {
                ...state.records[recordIndex],
                ...action.payload
            };

            const updatedRecords = [...state.records];
            updatedRecords[recordIndex] = updatedRecord;

            return {
                ...state,
                records: updatedRecords
            };
        case ORDER_RECORDS_BY:
            const by = action.payload;
            let sortedRecords = null;

            if (by === "viewdate") {
                sortedRecords = state.records.slice().sort((a, b) => b.viewdate - a.viewdate);
            }

            return {
                ...state,
                records: sortedRecords
            };
        case POPULATE_MOVIES_AUTOSUGGEST_START:
            return {
                ...state,
            };
        case POPULATE_MOVIES_AUTOSUGGEST_SUCCESS:
            return {
                ...state,
                emptyRecord: {
                    ...state.emptyRecord,
                    records: action.payload.data.results
                }
            };
        case POPULATE_MOVIES_AUTOSUGGEST_FAILURE:
            return {
                ...state,
            };
        case POPULATE_TV_AUTOSUGGEST_START:
            return {
                ...state,
            };
        case POPULATE_TV_AUTOSUGGEST_SUCCESS:
            return {
                ...state,
                emptyRecord: {
                    ...state.emptyRecord,
                    records: action.payload.data.results
                }
            };
        case POPULATE_TV_AUTOSUGGEST_FAILURE:
            return {
                ...state,
            };
        case AUTHENTICATION_CLEAR:
            return {
                ...state,
                user: getInitialAsyncContainer()
            };
        case AUTHENTICATION_START:
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoading: true,
                    error: null
                }
            };
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoading: false,
                    data: action.payload
                }
            };
        case AUTHENTICATION_FAILURE:
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoading: false,
                    error: action.payload.response
                }
            };
    }

    return state;
};

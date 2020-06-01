import {map} from "lodash";
import {
    ADD_EMPTY_MOVIE_RECORD,
    ADD_EMPTY_TVSERIES_RECORD,
    ADD_RECORD_SUCCESS,
    CLEAR_RECORDS,
    GET_RECORDS_FAILURE,
    GET_RECORDS_START,
    GET_RECORDS_SUCCESS,
    ORDER_RECORDS_BY,
    REMOVE_RECORD,
    UPDATE_RECORD,
} from "../Actions/ActionTypes";
import {createEmptyRecord, getInitialAsyncContainer} from "../Utils/Utils";

/**
 * Редюсер для узла "records".
 */
export default function records(state = getInitialAsyncContainer(), action) {
    switch (action.type) {
        case REMOVE_RECORD:
            // TODO: Исправить когда будет удаление через сервис
            // return {
            //     ...state,
            //     records: filter(state.records, (record) => record.id !== action.payload.id),
            //     emptyRecord: {
            //         records: [],
            //     }
            // };
            return state;
        case ADD_EMPTY_MOVIE_RECORD:
            return {
                ...state,
                data: [{...createEmptyRecord(), type: "movie"}, ...state.data]

            };
        case ADD_EMPTY_TVSERIES_RECORD:
            return {
                ...state,
                data: [{...createEmptyRecord(), type: "tvseries"}, ...state.data]
            };
        case ADD_RECORD_SUCCESS:
            const newRecords = [action.payload];

            for (let i = 1; i < (state.data.length); i++) {
                newRecords.push(state.data[i]);
            }

            return {
                data: newRecords,
                isLoading: false,
                error: null
            };
        case UPDATE_RECORD:
            // TODO: Исправить когда будет обновление через сервис
            // const recordIndex = findIndex(state.records, {id: action.payload.id});
            // const updatedRecord = {
            //     ...state.records[recordIndex],
            //     ...action.payload
            // };

            // const updatedRecords = [...state.records];
            // updatedRecords[recordIndex] = updatedRecord;

            // return {
            //     ...state,
            //     records: updatedRecords
            // };
            return state;
        case ORDER_RECORDS_BY:
            // TODO: Исправить когда будет обновление через сервис
            // const by = action.payload;
            // let sortedRecords = null;

            // if (by === "viewdate") {
            //     sortedRecords = state.records.slice().sort((a, b) => b.viewdate - a.viewdate);
            // }

            // return {
            //     ...state,
            //     records: sortedRecords
            // };
            return state;
        case GET_RECORDS_START:
            return {
                ...state,
                isLoading: true
            };
        case GET_RECORDS_SUCCESS: {
            const records = map(action.payload.data, (item) => ({...item, viewdate: new Date(item.viewdate)}));

            return {
                isLoading: false,
                data: records,
                error: null
            };
        }
        case GET_RECORDS_FAILURE:
            return {
                error: null,
                isLoading: false,
                data: null
            };
        case CLEAR_RECORDS:
            return getInitialAsyncContainer();
        default:
            return state;
    }
}

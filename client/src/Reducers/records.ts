import {filter, map} from "lodash";
import {Reducer} from "redux";
import {
    ADD_EMPTY_MOVIE_RECORD,
    ADD_EMPTY_TVSERIES_RECORD,
    ADD_RECORD_FAILURE,
    ADD_RECORD_SUCCESS,
    CLEAR_RECORDS,
    DELETE_EMPTY_RECORD,
    DELETE_RECORD_FAILURE,
    DELETE_RECORD_START,
    DELETE_RECORD_SUCCESS,
    GET_RECORDS_FAILURE,
    GET_RECORDS_START,
    GET_RECORDS_SUCCESS,
    ORDER_RECORDS_BY,
    UPDATE_RECORD_FAILURE,
    UPDATE_RECORD_START,
    UPDATE_RECORD_SUCCESS,
} from "../Actions/ActionTypes";
import {IErrorDataObject, IFSAAction} from "../Interfaces/Common";
import {IClientRecord} from "../Interfaces/ClientRecord";
import {createEmptyRecord, getInitialAsyncContainer} from "../Utils/Utils";
import {IRecordsReduxState} from "./records.types";
import {ERecordType} from "../Enums";

type RecordsAction = IFSAAction<any>; // TODO: Расписать все возможные экшены.

const initialState: IRecordsReduxState = getInitialAsyncContainer<
    IClientRecord[],
    IErrorDataObject
>();

/**
 * Редюсер для узла "records".
 */
const recordsReducer: Reducer<IRecordsReduxState> = (
    state = initialState,
    action: RecordsAction
) => {
    switch (action.type) {
        case ADD_EMPTY_MOVIE_RECORD:
            return {
                ...state,
                data: [{...createEmptyRecord(), type: ERecordType.MOVIE}, ...state.data],
            };
        case ADD_EMPTY_TVSERIES_RECORD:
            return {
                ...state,
                data: [{...createEmptyRecord(), type: ERecordType.TV_SERIES}, ...state.data],
            };
        case ADD_RECORD_SUCCESS:
            const newRecords = [
                {
                    ...action.payload,
                    viewdate: new Date(action.payload.viewdate),
                },
            ];

            for (let i = 1; i < state.data.length; i++) {
                newRecords.push(state.data[i]);
            }

            return {
                data: newRecords,
                isLoading: false,
                error: null,
            };
        case ADD_RECORD_FAILURE:
            return {
                data: {
                    ...state.data,
                },
                isLoading: false,
                error: {
                    status: action.payload.response.status,
                    message: action.payload.response.data.message,
                },
            };
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
        case UPDATE_RECORD_START:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATE_RECORD_SUCCESS: {
            const updatedRecords = state.data
                .map((record) => {
                    if (record._id === action.payload.data._id) {
                        return {
                            ...action.payload.data,
                            viewdate: new Date(action.payload.data.viewdate),
                        };
                    }

                    return record;
                })
                .sort((a, b) => b.viewdate - a.viewdate);

            return {
                isLoading: false,
                data: updatedRecords,
                error: null,
            };
        }
        case UPDATE_RECORD_FAILURE:
            return {
                error: null,
                isLoading: false,
                data: null,
            };
        case DELETE_RECORD_START:
            return {
                ...state,
                isLoading: true,
            };
        case DELETE_RECORD_SUCCESS: {
            const updatedRecords = filter(state.data, (record) => record._id !== action.payload);

            return {
                isLoading: false,
                data: updatedRecords,
                error: null,
            };
        }
        case DELETE_RECORD_FAILURE:
            return {
                error: null,
                isLoading: false,
                data: null,
            };
        case DELETE_EMPTY_RECORD:
            return {
                ...state,
                data: filter(state.data, (record) => record._id !== "0"),
            };
        case GET_RECORDS_START:
            return {
                ...state,
                isLoading: true,
            };
        case GET_RECORDS_SUCCESS: {
            const records: IClientRecord[] = map(action.payload, (item) => ({
                ...item,
                viewdate: new Date(item.viewdate),
            }));

            return {
                isLoading: false,
                data: records,
                error: null,
            };
        }
        case GET_RECORDS_FAILURE:
            return {
                error: action.payload as IErrorDataObject,
                isLoading: false,
                data: null,
            };
        case CLEAR_RECORDS:
            return getInitialAsyncContainer();
        default:
            return state;
    }
};

export default recordsReducer;

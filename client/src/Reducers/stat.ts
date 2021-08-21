import {GET_STAT_FAILURE, GET_STAT_START, GET_STAT_SUCCESS} from "../Actions/ActionTypes";
import {IErrorDataObject, IFSAAction} from "../Interfaces/Common";
import {IStat} from "../Interfaces/Stat";
import {getInitialAsyncContainer} from "../Utils/Utils";
import {IStatReduxState} from "./stat.types";

type StatAction = IFSAAction<any>; // TODO: Расписать все возможные экшены.

const initialState: IStatReduxState = getInitialAsyncContainer<IStat, IErrorDataObject>();

/**
 * Редюсер для узла "stat".
 */
export default function stat(state = initialState, action: StatAction) {
    switch (action.type) {
        case GET_STAT_START:
            return {
                ...state,
                isLoading: true,
            };
        case GET_STAT_SUCCESS: {
            return {
                data: action.payload.data,
                isLoading: false,
                error: null as IErrorDataObject,
            };
        }
        case GET_STAT_FAILURE:
            return {
                error: null,
                isLoading: false,
                data: null,
            };
        default:
            return state;
    }
}

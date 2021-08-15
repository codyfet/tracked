import {GET_STAT_FAILURE, GET_STAT_START, GET_STAT_SUCCESS} from "../Actions/ActionTypes";
import {IFSAAction} from "../Interfaces/Common";
import {getInitialAsyncContainer} from "../Utils/Utils";

type StatAction = IFSAAction<any>; // TODO: Расписать все возможные экшены.

/**
 * Редюсер для узла "stat".
 */
export default function stat(state = getInitialAsyncContainer(), action: StatAction) {
    switch (action.type) {
        case GET_STAT_START:
            return {
                ...state,
                isLoading: true,
            };
        case GET_STAT_SUCCESS: {
            return {
                isLoading: false,
                data: action.payload.data,
                error: null,
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

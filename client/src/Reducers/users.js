import {
    CLEAR_USERS,
    GET_USERS_FAILURE,
    GET_USERS_START,
    GET_USERS_SUCCESS,
} from "../Actions/ActionTypes";
import {getInitialAsyncContainer} from "../Utils/Utils";

/**
 * Редюсер для узла "users".
 */
export default function users(state = getInitialAsyncContainer(), action) {
    switch (action.type) {
        case CLEAR_USERS:
            return getInitialAsyncContainer();
        case GET_USERS_START:
            return {
                data: null,
                isLoading: true,
                error: null
            };
        case GET_USERS_SUCCESS:
            return {
                data: action.payload,
                isLoading: false,
                error: null,
            };
        case GET_USERS_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: action.payload.response
            };
        default:
            return state;
    }
}
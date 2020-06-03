import {
    AUTHENTICATION_CLEAR,
    AUTHENTICATION_FAILURE,
    AUTHENTICATION_START,
    AUTHENTICATION_SUCCESS,
} from "../Actions/ActionTypes";
import {getInitialAsyncContainer} from "../Utils/Utils";

/**
 * Редюсер для узла "user".
 */
export default function user(state = getInitialAsyncContainer(), action) {
    switch (action.type) {
        case AUTHENTICATION_CLEAR:
            return getInitialAsyncContainer();
        case AUTHENTICATION_START:
            return {
                data: null,
                isLoading: true,
                error: null
            };
        case AUTHENTICATION_SUCCESS:
            return {
                data: action.payload,
                isLoading: false,
                error: null,
            };
        case AUTHENTICATION_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: action.payload.response
            };
        default:
            return state;
    }
}
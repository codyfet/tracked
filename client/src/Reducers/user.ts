import {IUserReduxState} from "./user.types";
import {Reducer} from "redux";
import {
    AUTHENTICATION_CLEAR,
    AUTHENTICATION_FAILURE,
    AUTHENTICATION_START,
    AUTHENTICATION_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_SUCCESS,
} from "../Actions/ActionTypes";
import {IFSAAction} from "../Interfaces/Common";
import {IClientUser} from "../Interfaces/User";
import {getInitialAsyncContainer} from "../Utils/Utils";

type UserAction = IFSAAction<any>; // TODO: Расписать все возможные экшены.

const initialState: IUserReduxState = getInitialAsyncContainer<IClientUser>();

/**
 * Редюсер для узла "user".
 */
const userReducer: Reducer<IUserReduxState> = (state = initialState, action: UserAction) => {
    switch (action.type) {
        case AUTHENTICATION_CLEAR:
            return initialState;
        case AUTHENTICATION_START:
            return {
                data: null,
                isLoading: true,
                error: null,
            };
        case AUTHENTICATION_SUCCESS:
            return {
                data: {
                    ...action.payload,
                    years:
                        action.payload.years.length > 0
                            ? action.payload.years
                            : [new Date().getFullYear().toString()],
                },
                isLoading: false,
                error: null,
            };
        case AUTHENTICATION_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: action.payload.response,
            };
        // case UPDATE_USER_START:
        //     return {
        //         data: null,
        //         isLoading: true,
        //         error: null
        //     };
        case UPDATE_USER_SUCCESS:
            return {
                data: {
                    ...state.data,
                    ...action.payload,
                },
                isLoading: false,
                error: null,
            };
        case UPDATE_USER_FAILURE:
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
        default:
            return state;
    }
};

export default userReducer;

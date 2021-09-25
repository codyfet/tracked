import {useDispatch} from "react-redux";
import {TRACKED_USER_DATA} from "../Consts";
import {getUserInfo} from "../Actions/Actions";

/**
 * Хук для проверки данных о залогиненном пользователе в localstorage.
 */
export const useCheckAuth = (): boolean => {
    const dispatch = useDispatch();
    const data = JSON.parse(localStorage.getItem(TRACKED_USER_DATA));
    let isAuthenticated = false;

    if (data && data.token) {
        isAuthenticated = true;
        dispatch(getUserInfo(data.userId));
    }

    return isAuthenticated;
};

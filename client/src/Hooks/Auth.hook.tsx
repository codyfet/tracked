import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {TRACKED_USER_DATA} from "../Consts";
import {getUserInfo} from "../Actions/Actions";

/**
 * Хук для проверки данных о залогиненном пользователе в localstorage.
 */
export const useCheckAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(TRACKED_USER_DATA));

        if (data && data.token) {
            dispatch(getUserInfo(data.userId));
        }
    }, [dispatch]);
};

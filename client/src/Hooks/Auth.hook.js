import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {LOGIN_SUCCESS} from "../Actions/ActionTypes";
import {TRACKED_USER_DATA} from "../Consts";

/**
 * Хук для проверки данных о залогиненном пользователе в localstorage.
 */
export const useCheckAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(TRACKED_USER_DATA));

        if (data && data.token) {
            dispatch({type: LOGIN_SUCCESS, payload: data});
        }
    });
};

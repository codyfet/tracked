import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../Actions/Actions";
import {SimpleModal} from "./Common/SimpleModal";

/**
 * Обёртка, ответственная за отрисовку ошибок.
 */
export const ErrorChecker = ({children}) => {
    const dispatch = useDispatch();
    const {user: {error}} = useSelector(state => state);
    const [showError, setShowError] = useState(!!error);

    if (!showError && error) {
        setShowError(true);
    }

    const handelCloseError = () => {
        setShowError(false);
        dispatch(logout());
    };

    return (
        <>
            {children}
            {showError && (
                <SimpleModal
                    content={<div>{error.message}</div>}
                    header="Ошибка"
                    onClose={handelCloseError}
                    onSuccess={handelCloseError}
                    hideCancel
                />
            )}
        </>
    );
};

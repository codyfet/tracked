import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../Actions/Actions";
import {SimpleModal} from "./Common/SimpleModal";

/**
 * Обёртка, ответственная за отрисовку ошибок.
 */
export const ErrorChecker = ({children}) => {
    const dispatch = useDispatch();
    const {user: {error: userError}, records: {error: recordsError}} = useSelector(state => state);
    const errors = [userError, recordsError];
    const hasError = errors.some(e => e);
    const [showError, setShowError] = useState(hasError);

    if (!showError && hasError) {
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
                    content={<div>{errors.map(e => e?.message)}</div>}
                    header="Ошибка"
                    onClose={handelCloseError}
                    onSuccess={handelCloseError}
                    hideCancel
                />
            )}
        </>
    );
};

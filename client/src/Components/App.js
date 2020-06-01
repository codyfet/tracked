import React, {Fragment} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Routes} from "../Routes/Routes";
import {useCheckAuth} from "../Hooks/Auth.hook";

import {LoadingOverlay} from "../Components/Common/LoadingOverlay";
import {Header} from "./Header";
import {useSelector} from "react-redux";

export const App = () => {
    const {isLoading} = useSelector(state => state);
    /**
     * Проверяем есть ли данные о залогиненном пользователе в localstorage.
     */
    useCheckAuth();

    return (
        <Fragment>
            {isLoading && <LoadingOverlay />}
            <Router>
                <Header />
                <Routes />
            </Router>
        </Fragment>
    );
};

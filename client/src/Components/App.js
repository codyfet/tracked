import React, {Fragment} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Routes} from "../Routes/Routes";
import {useCheckAuth} from "../Hooks/Auth.hook";
import {Header} from "./Header";
import {Footer} from "./Footer";

export const App = () => {
    /**
     * Проверяем есть ли данные о залогиненном пользователе в localstorage.
     */
    useCheckAuth();

    return (
        <Fragment>
            <Router>
                <Header />
                <Routes />
                <Footer />
            </Router>
        </Fragment>
    );
};

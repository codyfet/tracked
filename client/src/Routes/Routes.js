import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import {Main} from "../Pages/Main";
import {Login} from "../Pages/Login";
import {Diary} from "../Pages/Diary";
import {Profile} from "../Pages/Profile";

/**
 * Возвращает набор доступных роутов приложения.
 *
 * @param {boolean} isAutheticated Признак авторизации пользователя.
 */
export const Routes = () => {
    const {user} = useSelector(state => state);
    const isAutheticated = user?.data;

    if (isAutheticated) {
        return (
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/diary" component={Diary} />
                <Route path="/profile" component={Profile} />
                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login" component={Login} />
            <Redirect to="/" />
        </Switch>
    );
};
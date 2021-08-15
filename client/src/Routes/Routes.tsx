import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import {Main} from "../Pages/Main";
import {Login} from "../Pages/Login";
import {Users} from "../Pages/Users";
import {Results} from "../Pages/Results";
import {Diary} from "../Pages/Diary";
import {Profile} from "../Pages/Profile";
import {IApplicationReduxState} from "../Reducers";

/**
 * Возвращает набор доступных роутов приложения.
 *
 * @param {boolean} isAutheticated Признак авторизации пользователя.
 */
export const Routes = () => {
    const {user} = useSelector((state: IApplicationReduxState) => state);
    const isAutheticated = user?.data;

    if (isAutheticated) {
        return (
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/users" component={Users} />
                <Route path="/results/:id" component={Results} />
                <Route path="/diary/:id" component={Diary} />
                <Route path="/profile/:id" component={Profile} />
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

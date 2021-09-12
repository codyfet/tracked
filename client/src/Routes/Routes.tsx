import React from "react";
import {Route, Switch, useLocation} from "react-router-dom";
import {Main} from "../Pages/Main";
import {Login} from "../Pages/Login";
import {Users} from "../Pages/Users";
import {Results} from "../Pages/Results";
import {Diary} from "../Pages/Diary";
import {Profile} from "../Pages/Profile";
import {ProtectedRoute} from "../Components/Common/ProtectedRoute";
import {ILocationState} from "../Interfaces/Common";
import {ErrorMessage} from "../Components/ErrorMessage";

/**
 * Возвращает набор доступных роутов приложения.
 *
 * @param {boolean} isAutheticated Признак авторизации пользователя.
 */
export const Routes = () => {
    const location = useLocation<ILocationState>();
    const errorMessage = location.state?.errorMessage;

    return (
        <>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <ProtectedRoute path="/users" component={Users} />
                <ProtectedRoute path="/results/:id" component={Results} />
                <ProtectedRoute path="/diary/:id" component={Diary} />
                <ProtectedRoute path="/profile/:id" component={Profile} />
            </Switch>
        </>
    );
};

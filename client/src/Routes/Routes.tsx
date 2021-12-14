import React from "react";
import {Route, Switch, useLocation} from "react-router-dom";
import {Main} from "../Pages/Main";
import {Login} from "../Pages/Login";
import {Users} from "../Pages/Users";
import {Results} from "../Pages/Results";
import {Diary} from "../Pages/Diary";
import {Profile} from "../Pages/Profile";
import {About} from "../Pages/About";
import {ProtectedRoute} from "../Components/Common/ProtectedRoute";
import {ILocationState} from "../Interfaces/Common";
import {ErrorMessage} from "../Components/ErrorMessage";
import {useCheckAuth} from "../Hooks/Auth.hook";

/**
 * Возвращает набор доступных роутов приложения.
 *
 * @param {boolean} isAutheticated Признак авторизации пользователя.
 */
export const Routes = () => {
    const isAuthenticated = useCheckAuth();
    const location = useLocation<ILocationState>();
    const errorMessage = location.state?.errorMessage;

    return (
        <>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/about" component={About} />
                <ProtectedRoute path="/users" isAuthenticated={isAuthenticated} component={Users} />
                <ProtectedRoute
                    path="/results/:id"
                    isAuthenticated={isAuthenticated}
                    component={Results}
                />
                <ProtectedRoute
                    path="/diary/:id"
                    isAuthenticated={isAuthenticated}
                    component={Diary}
                />
                <ProtectedRoute
                    path="/profile/:id"
                    isAuthenticated={isAuthenticated}
                    component={Profile}
                />
            </Switch>
        </>
    );
};

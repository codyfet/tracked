import React from "react";
import {Redirect, Route, RouteProps} from "react-router-dom";
import {ILocationState} from "../../Interfaces/Common";

/**
 * @prop {string} path Маршрут.
 * @prop {string} isAuthenticated Признак авторизованного пользователя.
 */
interface IProps extends RouteProps {
    path: string;
    isAuthenticated: boolean;
}

/**
 * Компонент защищённый роут - препятствует посещению страницы, если пользователь не аутентифицирован.
 */
export const ProtectedRoute = ({component, path, isAuthenticated, ...rest}: IProps) => (
    <Route
        path={path}
        {...rest}
        render={(props) => {
            return isAuthenticated ? (
                React.createElement(component, props)
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {
                            prevLocation: location.pathname,
                            errorMessage: "Войдите или зарегистрируйтесь",
                        } as ILocationState,
                    }}
                />
                // TODO: можно использовать history.push
            );
        }}
    />
);

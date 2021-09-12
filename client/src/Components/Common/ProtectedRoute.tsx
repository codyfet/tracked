import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route, RouteProps} from "react-router-dom";
import {ILocationState} from "../../Interfaces/Common";
import {IApplicationReduxState} from "../../Reducers";

/**
 * @prop {string} path Маршрут.
 */
interface IProps extends RouteProps {
    path: string;
}

/**
 * Компонент защищённый роут - препятствует посещению страницы, если пользователь не аутентифицирован.
 */
export const ProtectedRoute = ({component, path, ...rest}: IProps) => {
    const {user} = useSelector((state: IApplicationReduxState) => state);
    const isAutheticated = user?.data;

    return (
        <Route
            path={path}
            {...rest}
            render={(props) => {
                return isAutheticated ? (
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
                );
            }}
        />
    );
};

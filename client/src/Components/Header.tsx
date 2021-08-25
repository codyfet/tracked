import React, {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {logout} from "../Actions/Actions";
import {IApplicationReduxState} from "../Reducers";

/**
 * Компонент шапка-приложения.
 */
export const Header = () => {
    const [isResponsive, setResponsive] = useState(false);
    const {user} = useSelector((state: IApplicationReduxState) => state);
    const dispatch = useDispatch();
    const isAutheticated = !!user.data;

    /**
     * Формирует доступные пункты меню.
     */
    const getMenuItems = () => {
        if (isAutheticated) {
            return (
                <Fragment>
                    <span className={`menu ${isResponsive ? "responsive" : ""}`}>
                        <Link to="/users" key="users">
                            пользователи
                        </Link>
                        <Link to={`/results/${user.data.userId}`} key="results">
                            итоги
                        </Link>
                        <Link to={`/diary/${user.data.userId}`} key="diary">
                            журнал просмотров
                        </Link>
                        <Link
                            to={`/profile/${user.data.userId}`}
                            key="profile"
                        >{`${user.data.username}`}</Link>
                        <a onClick={() => dispatch(logout())}>выйти</a>
                    </span>

                    <Icon
                        name="bars"
                        onClick={() => setResponsive(!isResponsive)}
                        title="меню"
                        className="burger"
                    />
                </Fragment>
            );
        }

        return (
            <span className="menu">
                <Link to="/login" key="login">
                    войти
                </Link>
            </span>
        );
    };

    return (
        <div className="header">
            <span className="logo">
                <Link to="/" key="main">
                    <span>tracked</span>
                </Link>
            </span>
            {getMenuItems()}
        </div>
    );
};

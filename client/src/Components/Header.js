import React, {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {logout} from "../Actions/Actions";
/**
 * Компонент шапка-приложения.
 */
export const Header = () => {
    const {user} = useSelector(state => state);
    const dispatch = useDispatch();
    const isAutheticated = !!user.data;

    /**
     * Формирует доступные пункты меню.
     */
    const getMenuItems = () => {
        if (isAutheticated) {
            return (
                <Fragment>
                    <Menu.Item as={Link} to='/' key="main" className="logo">
                        <span className="logo">tracked</span>
                    </Menu.Item>
                    <div className="right menu">
                        <Menu.Item as={Link} to='/users' key="users" position="right">
                            пользователи
                        </Menu.Item>
                        <Menu.Item as={Link} to='/diary' key="diary" position="right">
                            журнал просмотров
                        </Menu.Item>
                        <Menu.Item as={Link} to='/profile' key="profile" position="right">
                            {`${user.data?.username}`}
                        </Menu.Item>
                        <Menu.Item as="a" name="logout" key="logout" onClick={() => dispatch(logout())} position="right">
                            выйти
                        </Menu.Item>
                    </div>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <Menu.Item as={Link} to='/' key="main" className="logo">
                    <span className="logo">tracked</span>
                </Menu.Item>
                <Menu.Item as={Link} to="/login" key="login" position="right">
                    войти
                </Menu.Item>
            </Fragment>
        );
    };

    return (
        <Menu borderless>
            <Container>
                {getMenuItems()}
            </Container>
        </Menu>
    );
};
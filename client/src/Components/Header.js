import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Image, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {logout} from "../Actions/Actions";
/**
 * Компонент шапка-приложения.
 */
export const Header = () => {
    const {user} = useSelector(state => state);
    const dispatch = useDispatch();
    const isAutheticated = user?.data;

    /**
     * Формирует доступные пункты меню.
     */
    const getMenuItems = () => {
        if (isAutheticated) {
            return [
                <Menu.Item as={Link} to='/' key="main">
                    главная
                </Menu.Item>,
                <Menu.Item as={Link} to='/diary' key="diary">
                    дневник
                </Menu.Item>,
                <Menu.Item as="a" name="results" key="results">
                    итоги
                </Menu.Item>,
                <Menu.Item as="a" name="avatar" key="avatar">
                    <div className="avatar-block">
                        <Image size="mini" src='src/Assets/matthew.png' avatar />
                        <span>Alexander Volkov</span>
                    </div>
                </Menu.Item>,
                <Menu.Item as="a" name="logout" key="logout" onClick={() => dispatch(logout())}>
                    выйти
                </Menu.Item>,
            ];
        }

        return [
            <Menu.Item as={Link} to="/login" key="login">
                войти
            </Menu.Item>
        ];
    };

    return (
        <Menu borderless>
            <Container>
                <Menu.Menu position="right">
                    {getMenuItems()}
                </Menu.Menu>
            </Container>
        </Menu>
    );
};
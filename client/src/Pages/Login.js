import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../Actions/Actions";
import {useToggle} from "../Hooks/Toggle.hook";
import {Button, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import {AUTHENTICATION_CLEAR} from "../Actions/ActionTypes";

/**
 * Страница логин/регистрация.
 */
export const Login = () => {
    const [form, setForm] = useState({email: "", password: "", username: ""});
    const [isLoginMode, toggleMode] = useToggle(true);
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state);
    let headerTitle, buttonText, messageQuestion, messageLink;

    if (isLoginMode) {
        headerTitle = "Войти в свой аккаунт";
        buttonText = "Войти";
        messageQuestion = "Нет аккаунта?";
        messageLink = "Регистрация";
    } else {
        headerTitle = "Регистрация";
        buttonText = "Создать аккаунт";
        messageQuestion = "Есть аккаунт?";
        messageLink = "Войти";
    }

    /**
     * Обработчик измения значения в инпуте.
     */
    const handleInputChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    /**
     * Обработчик изменения смены режима формы логин/регистрация.
     */
    const handleModeLink = (e) => {
        e.preventDefault();
        toggleMode();
        dispatch({type: AUTHENTICATION_CLEAR});
    };

    /**
     * Возвращает компонент, выводящий ошибки логина/регистрации.
     */
    const getErrorMessage = () => {
        if (!user?.error) {
            return null;
        }

        if (isLoginMode) {
            return <Message negative content={<p>{user.error?.data.message}</p>} />;
        }

        return (
            <Message
                error
                list={user.error.data?.errors?.map((e, index) => (
                    <p key={index}>{e.msg}</p>
                ))}
            />
        );
    };

    return (
        <Grid className="login" textAlign="center">
            <Grid.Column style={{maxWidth: 450}}>
                <Header size="large">{headerTitle}</Header>
                <Form size="large">
                    <Segment>
                        <Form.Input
                            fluid
                            icon="at"
                            iconPosition="left"
                            placeholder="E-mail"
                            value={form.email}
                            name="email"
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Пароль"
                            type="password"
                            value={form.password}
                            name="password"
                            onChange={handleInputChange}
                        />
                        {!isLoginMode && (
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="Имя пользователя"
                                value={form.username}
                                name="username"
                                onChange={handleInputChange}
                            />
                        )}
                        <Button
                            fluid
                            size="large"
                            onClick={() => dispatch(isLoginMode ? login(form) : register(form))}
                        >
                            {buttonText}
                        </Button>
                    </Segment>
                </Form>
                {user?.error && getErrorMessage()}
                <Message>
                    {messageQuestion}&nbsp;
                    <a href="#" onClick={handleModeLink}>
                        {messageLink}
                    </a>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

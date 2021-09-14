import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../Actions/Actions";
import {useToggle} from "../Hooks/Toggle.hook";
import {Button, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import {AUTHENTICATION_CLEAR} from "../Actions/ActionTypes";
import {IApplicationReduxState} from "../Reducers";
import {useHistory, useLocation} from "react-router-dom";
import {ILocationState} from "../Interfaces/Common";

/**
 * Страница логин/регистрация.
 */
export const Login = () => {
    const history = useHistory();
    const location = useLocation<ILocationState>();
    const prevLocation = location.state?.prevLocation;
    const [form, setForm] = useState({email: "", password: "", username: ""});
    const [isLoginMode, toggleMode] = useToggle(true);
    const dispatch = useDispatch();
    const {user} = useSelector((state: IApplicationReduxState) => state);
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
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    /**
     * Обработчик изменения смены режима формы логин/регистрация.
     */
    const handleModeLink = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        toggleMode();
        dispatch({type: AUTHENTICATION_CLEAR});
    };

    /**
     * Обработчик нажатия на кнопку "Войти" (submit).
     */
    const handleSubmit = async () => {
        const result = await dispatch(isLoginMode ? login(form) : register(form));

        if (result) {
            history.push(prevLocation || "/");
        }
    };

    /**
     * Возвращает компонент, выводящий ошибку логина/регистрации.
     */
    const getErrorMessage = () => {
        if (!user?.error) {
            return null;
        }

        return <Message negative content={<p>{user.error?.message}</p>} />;
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
                        <Button fluid size="large" onClick={handleSubmit}>
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

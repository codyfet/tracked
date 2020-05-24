import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../Actions/Actions";
import {useToggle} from "../Hooks/Toggle.hook";
import {Button, Form, Grid, Header, Message, Segment} from "semantic-ui-react";

/**
 * Страница логин/регистрация.
 */
export const Login = () => {
    const [form, setForm] = useState({email: "", password: ""});
    const [isLoginMode, toggleMode] = useToggle(true);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state);
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
    };

    /**
     * Возвращает компонент, выводящий ошибки логина/регистрации.
     */
    const getErrorMessage = () => {
        if (!user?.error) {
            return null;
        }

        if (isLoginMode) {
            return (
                <Message
                    negative
                    content={<p>{user.error?.data.message}</p>}
                />
            );
        }

        return (
            /**
             * TODO: Исправить баг: добавить очистку user при смене режима Login/Register.
             */
            <Message
                error
                list={user.error.data?.errors?.map((e) => <p>{e.msg}</p>)}
            />
        );
    };

    return (
        <Grid textAlign='center' >
            <Grid.Column style={{maxWidth: 450}}>
                <Header size='large'>{headerTitle}</Header>
                <Form size='large'>
                    <Segment>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='E-mail'
                            value={form.email}
                            name="email"
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Пароль'
                            type='password'
                            value={form.password}
                            name="password"
                            onChange={handleInputChange}
                        />
                        <Button
                            color='teal'
                            fluid
                            size='large'
                            onClick={() => dispatch(isLoginMode ? login(form) : register(form))}
                        >
                            {buttonText}
                        </Button>
                    </Segment>
                </Form>
                {user?.error && getErrorMessage()}
                <Message>
                    {messageQuestion}&nbsp;<a href='#' onClick={handleModeLink}>{messageLink}</a>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

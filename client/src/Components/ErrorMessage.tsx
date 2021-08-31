import React from "react";
import {Container, Message} from "semantic-ui-react";

interface IProps {
    errorMessage: string;
}

/**
 * Компонент выводит сообщение об ошибке на красном фоне (алерт).
 */
export const ErrorMessage = ({errorMessage}: IProps) => (
    <Container>
        <div className="mt20">
            <Message negative>
                <Message.Header>Ошибка</Message.Header>
                <p>{errorMessage}</p>
            </Message>
        </div>
    </Container>
);

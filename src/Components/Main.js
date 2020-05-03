import React from 'react';
import {Container} from 'semantic-ui-react';
import {Record} from './Record';

/**
 * Компонент главная область приложения.
 */
export const Main = () => (
    <Container className="main">
        <Record />
        <Record />
        <Record />
        <Record />
        <Record />
    </Container>
);
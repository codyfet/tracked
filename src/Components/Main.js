import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Container, Grid, Button} from 'semantic-ui-react';
import {Record} from './Record';
import {ADD_RECORD} from '../Actions/ActionTypes';

/**
 * Компонент главная область приложения.
 */
export const Main = () => {
    const records = useSelector(state => state.records);
    const dispatch = useDispatch();

    return (
        <Container className="main">
            <Grid columns="2" verticalAlign="middle">
                <Grid.Column>
                    <span>Фильмы (18)</span>&nbsp;&nbsp;&nbsp;
                    <span>Сериалы (3)</span>
                </Grid.Column>
                <Grid.Column textAlign="right">
                    <Button onClick={() => dispatch({type: ADD_RECORD})}>Добавить</Button>
                </Grid.Column>
            </Grid>


            {records.map((record) => (
                <Record
                    id={record.id}
                    key={record.id}
                    {...record}
                />
            ))}
        </Container>
    );
};

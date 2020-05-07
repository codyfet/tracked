import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Button, Container, Grid} from 'semantic-ui-react';
import {Record} from './Record';
import {ADD_EMPTY_MOVIE_RECORD, ADD_EMPTY_TVSERIES_RECORD} from '../Actions/ActionTypes';
import {filter} from 'lodash';

/**
 * Компонент главная область приложения.
 */
export const Main = () => {
    const {records, emptyRecord} = useSelector(state => state);
    const dispatch = useDispatch();

    const moviesCount = filter(records, (record) => record.type === "movie").length;
    const tvseriesCount = records.length ? records.length - moviesCount : 0;

    return (
        <Container className="main">
            <Grid columns="2" verticalAlign="middle">
                <Grid.Column>
                    <span>Фильмы ({moviesCount})</span>&nbsp;&nbsp;&nbsp;
                    <span>Сериалы ({tvseriesCount})</span>
                </Grid.Column>
                <Grid.Column textAlign="right">
                    <span>Добавить</span>&nbsp;&nbsp;&nbsp;
                    <Button disabled={emptyRecord.isExists} onClick={() => dispatch({type: ADD_EMPTY_MOVIE_RECORD})}>Фильм</Button>
                    <Button disabled={emptyRecord.isExists} onClick={() => dispatch({type: ADD_EMPTY_TVSERIES_RECORD})}>Сериал</Button>
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

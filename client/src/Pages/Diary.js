import {ADD_EMPTY_MOVIE_RECORD, ADD_EMPTY_TVSERIES_RECORD, CLEAR_RECORDS} from "../Actions/ActionTypes";
import {getRecords} from "../Actions/Actions";
import {Button, Container, Dropdown, Grid} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {filter, some} from "lodash";
import {useDispatch, useSelector} from "react-redux";

import {Record} from "../Components/Record";

const years = [
    {key: "2019", value: "2019", text: "2019"},
    {key: "2018", value: "2018", text: "2018"},
    {key: "2017", value: "2017", text: "2017"}
];

/**
 * Страница журнал просмотров.
 */
export const Diary = () => {
    const dispatch = useDispatch();
    const {records: {data: records}, user: {data: {userId}}} = useSelector(state => state);

    const [isMoviesFilterApplied, setMoviesFilterApplied] = useState(true);
    const [isTvSeriesFilterApplied, setTvSeriesFilterApplied] = useState(true);
    const [isNotFinishedFilterApplied, setNotFinishedFilterApplied] = useState(true);

    const isEmptyRecordExist = some(records, ({isEmptyRecord}) => isEmptyRecord);

    const moviesCount = filter(records, ({type, isEmptyRecord}) => !isEmptyRecord && type === "movie").length;
    const tvseriesCount = filter(records, ({type, isEmptyRecord}) => !isEmptyRecord && type === "tvseries").length;
    const notFinishedCount = filter(records, ({notFinished}) => notFinished).length;

    useEffect(() => {
        dispatch(getRecords(userId, {sortBy: "-viewdate"}));
        return () => {
            dispatch({type: CLEAR_RECORDS});
        };
    }, [dispatch, userId]);

    /**
     * Фильтруем записи.
     */
    const filtered = filter(records, (record) => {
        if (isMoviesFilterApplied && record.type === "movie") {
            return true;
        } else if (isTvSeriesFilterApplied && record.type === "tvseries") {
            return true;
        }

        if (isNotFinishedFilterApplied) {
            return true;
        }

        return false;
    });

    return (
        <Container className="main">
            <Grid columns="2" verticalAlign="middle">
                <Grid.Column>
                    <Dropdown
                        inline
                        options={years}
                        defaultValue={years[0].value}
                    />&nbsp;&nbsp;&nbsp;
                    <span
                        className={`record-filter ${isMoviesFilterApplied ? "" : "not-selected"}`}
                        onClick={() => setMoviesFilterApplied(!isMoviesFilterApplied)}
                    >
                        Фильмы ({moviesCount})
                    </span>&nbsp;&nbsp;&nbsp;
                    <span
                        className={`record-filter ${isTvSeriesFilterApplied ? "" : "not-selected"}`}
                        onClick={() => setTvSeriesFilterApplied(!isTvSeriesFilterApplied)}
                    >
                        Сериалы ({tvseriesCount})
                    </span>&nbsp;&nbsp;&nbsp;
                    <span
                        className={`record-filter ${isNotFinishedFilterApplied ? "" : "not-selected"}`}
                        onClick={() => setNotFinishedFilterApplied(!isNotFinishedFilterApplied)}
                    >
                        Недосмотренные ({notFinishedCount})
                    </span>&nbsp;&nbsp;&nbsp;
                </Grid.Column>
                <Grid.Column textAlign="right">
                    <span>Добавить</span>&nbsp;&nbsp;&nbsp;
                    <Button disabled={isEmptyRecordExist} onClick={() => dispatch({type: ADD_EMPTY_MOVIE_RECORD})}>Фильм</Button>
                    <Button disabled={isEmptyRecordExist} onClick={() => dispatch({type: ADD_EMPTY_TVSERIES_RECORD})}>Сериал</Button>
                </Grid.Column>
            </Grid>

            {filtered.map((record) => (
                <Record
                    id={record.id}
                    key={record.id}
                    {...record}
                />
            ))}
        </Container>
    );
};

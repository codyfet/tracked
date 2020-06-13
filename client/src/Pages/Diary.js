import {ADD_EMPTY_MOVIE_RECORD, ADD_EMPTY_TVSERIES_RECORD, CLEAR_RECORDS} from "../Actions/ActionTypes";
import {getRecords} from "../Actions/Actions";
import {Button, Container, Dropdown, Grid} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {filter, some} from "lodash";
import {useDispatch, useSelector} from "react-redux";

import {Record} from "../Components/Record";

const YEARS = [
    {key: "2020", value: "2020", text: "2020"},
    {key: "2019", value: "2019", text: "2019"},
];

const TYPES = ["movie", "tvseries"];

/**
 * Страница журнал просмотров.
 */
export const Diary = () => {
    const dispatch = useDispatch();
    const {records: {data: records}, user: {data: {userId}}} = useSelector(state => state);

    const [isMoviesFilterApplied, setMoviesFilterApplied] = useState(true);
    const [isTvSeriesFilterApplied, setTvSeriesFilterApplied] = useState(true);
    const [isNotFinishedFilterApplied, setNotFinishedFilterApplied] = useState(true);

    const [recordsFilter, setRecordsFilter] = useState({sortBy: "-viewdate", year: new Date().getFullYear(), types: TYPES});

    const isEmptyRecordExist = some(records, ({isEmptyRecord}) => isEmptyRecord);

    const moviesCount = filter(records, ({type, isEmptyRecord}) => !isEmptyRecord && type === "movie").length;
    const tvseriesCount = filter(records, ({type, isEmptyRecord}) => !isEmptyRecord && type === "tvseries").length;
    const notFinishedCount = filter(records, ({notFinished}) => notFinished).length;

    useEffect(() => {
        dispatch(getRecords(userId, recordsFilter));
        return () => {
            dispatch({type: CLEAR_RECORDS});
        };
    }, [dispatch, userId, recordsFilter]);

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
                        options={YEARS}
                        defaultValue={YEARS[0].value}
                        onChange={(e) => setRecordsFilter({...recordsFilter, year: e.target.textContent})}
                    />&nbsp;&nbsp;&nbsp;
                    <span
                        className={`record-filter ${isMoviesFilterApplied ? "" : "not-selected"}`}
                        onClick={() => {
                            // setRecordsFilter({
                            //     ...recordsFilter,
                            //     types: filter(
                            //         TYPES,
                            //         (type) => {
                            //             return type !== "movie" || (type === "movie" && isMoviesFilterApplied);
                            //         }
                            //     )
                            // });
                            setMoviesFilterApplied(!isMoviesFilterApplied);
                        }}
                    >
                        Фильмы {moviesCount ? `(${moviesCount})` : ""}
                    </span>&nbsp;&nbsp;&nbsp;
                    <span
                        className={`record-filter ${isTvSeriesFilterApplied ? "" : "not-selected"}`}
                        onClick={() => {
                            // setRecordsFilter({
                            //     ...recordsFilter,
                            //     types: filter(
                            //         TYPES,
                            //         (type) => {
                            //             return type !== "tvseries" || (type === "tvseries" && isTvSeriesFilterApplied);
                            //         }
                            //     )
                            // });
                            setTvSeriesFilterApplied(!isTvSeriesFilterApplied);
                        }}
                    >
                        Сериалы {tvseriesCount ? `(${tvseriesCount})` : ""}
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
                    key={record._id}
                    {...record}
                />
            ))}
        </Container>
    );
};

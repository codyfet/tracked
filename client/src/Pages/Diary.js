import {
    ADD_EMPTY_MOVIE_RECORD,
    ADD_EMPTY_TVSERIES_RECORD,
    CLEAR_RECORDS,
} from "../Actions/ActionTypes";
import {getRecords} from "../Actions/Actions";
import {Button, Container, Grid, Header, Message} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {filter, some} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {Record} from "../Components/Record";
import {Page} from "./../Components/Common/Page";
import {DEFAULT_RECORDS_FILTER} from "./../Consts";
import {YearsSelect} from "../Components/YearsSelect";

/**
 * Страница журнал просмотров.
 */
export const Diary = ({match}) => {
    const dispatch = useDispatch();
    const userId = match.params.id;
    const {
        records: {data: records},
        user: {
            data: {userId: loggedInUser},
        },
    } = useSelector((state) => state);

    const [isMoviesFilterApplied, setMoviesFilterApplied] = useState(true);
    const [isTvSeriesFilterApplied, setTvSeriesFilterApplied] = useState(true);

    const [recordsFilter, setRecordsFilter] = useState(DEFAULT_RECORDS_FILTER);

    const isEmptyRecordExist = some(records, ({isEmptyRecord}) => isEmptyRecord);

    const moviesCount = filter(
        records,
        ({type, isEmptyRecord}) => !isEmptyRecord && type === "movie"
    ).length;
    const tvseriesCount = filter(
        records,
        ({type, isEmptyRecord}) => !isEmptyRecord && type === "tvseries"
    ).length;

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

        return false;
    });

    return (
        <Page asyncDataKeys={["records"]}>
            <Container className="diary">
                <Header as="h2" size="large">
                    Журнал пользователя
                </Header>
                <Grid columns="2" verticalAlign="middle">
                    <Grid.Column>
                        <YearsSelect
                            selectedYear={recordsFilter.year}
                            onSelect={(event, data) =>
                                setRecordsFilter({
                                    ...recordsFilter,
                                    year: data.value,
                                })
                            }
                        />
                        &nbsp;&nbsp;&nbsp;
                        <span
                            className={`record-filter ${
                                isMoviesFilterApplied ? "" : "not-selected"
                            }`}
                            onClick={() => setMoviesFilterApplied(!isMoviesFilterApplied)}
                            title={isMoviesFilterApplied ? "Скрыть фильмы" : "Показать фильмы"}
                        >
                            Фильмы ({moviesCount})
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <span
                            className={`record-filter ${
                                isTvSeriesFilterApplied ? "" : "not-selected"
                            }`}
                            onClick={() => setTvSeriesFilterApplied(!isTvSeriesFilterApplied)}
                            title={isTvSeriesFilterApplied ? "Скрыть сериалы" : "Показать сериалы"}
                        >
                            Сериалы ({tvseriesCount})
                        </span>
                        &nbsp;&nbsp;&nbsp;
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        {loggedInUser === userId && (
                            <>
                                <span>Добавить</span>&nbsp;&nbsp;&nbsp;
                                <Button
                                    disabled={isEmptyRecordExist}
                                    onClick={() =>
                                        dispatch({
                                            type: ADD_EMPTY_MOVIE_RECORD,
                                        })
                                    }
                                >
                                    Фильм
                                </Button>
                                <Button
                                    disabled={isEmptyRecordExist}
                                    onClick={() =>
                                        dispatch({
                                            type: ADD_EMPTY_TVSERIES_RECORD,
                                        })
                                    }
                                >
                                    Сериал
                                </Button>
                            </>
                        )}
                    </Grid.Column>
                </Grid>

                {filtered.map((record) => (
                    <Record key={record._id} {...record} />
                ))}

                {filtered.length === 0 && (
                    <Message info>
                        <Message.Header>
                            В вашем журнале пока нет ни одной записи для выбранного года
                        </Message.Header>
                        <p>Добавьте запись о просмотренном фильме или сериале</p>
                    </Message>
                )}
            </Container>
        </Page>
    );
};

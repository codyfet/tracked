import {getRecords, updateRecords} from "../Actions/Actions";
import {Container, Header, Input, Message, Table} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Page} from "./../Components/Common/Page";
import {YearsSelect} from "../Components/YearsSelect";
import {CLEAR_RECORDS} from "./../Actions/ActionTypes";
import {DEFAULT_RECORDS_FILTER} from "./../Consts";
import {isEmpty} from "lodash";
import {Link} from "react-router-dom";
import {Record} from "./../Components/Record";

/**
 * Сравнивает объекты записи по значению Position.
 */
function compareRecordsByPosition(a, b) {
    if (parseInt(a.position) < parseInt(b.position)) {
        return -1;
    }
    if (parseInt(a.position) > parseInt(b.position)) {
        return 1;
    }
    return 0;
}

/**
 * Возвращает отфильтрованные записи (фильмы или сериалы).
 *
 * @param {Object[]} records Массив записей.
 * @param {boolean} isMoviesSelected Признак того, чтоб выбрано представление для фильмов.
 */
const getFilteredRecords = (records, isMoviesSelected) => {
    const type = isMoviesSelected ? "movie" : "tvseries";

    return records.filter((record) => record.type === type);
};

/**
 * Страница Итоги.
 */
export const Results = ({match}) => {
    const dispatch = useDispatch();
    const profileUserId = match.params.id;
    const {records: {data: records}, user: {data: {userId}}} = useSelector(state => state);
    const [isMoviesSelected, setMoviesSelected] = useState(true);
    const [enrichedRecords, setEnrichedRecords] = useState(null);
    const [isEditModeClicked, setEditModeClicked] = useState(false);
    const [year, setYear] = useState(0);
    const isRecordsEmpty = isEmpty(enrichedRecords);
    const isResultsExist = !isRecordsEmpty && records?.some((r) => r.position && r.type === (isMoviesSelected ? "movie" : "tvseries"));

    useEffect(() => {
        const filter = {
            ...DEFAULT_RECORDS_FILTER,
            year
        };
        dispatch(getRecords(profileUserId, filter));
        return () => {
            dispatch({type: CLEAR_RECORDS});
        };
    }, [dispatch, profileUserId, year]);

    useEffect(() => {
        setEnrichedRecords(records);
    }, [records]);

    /**
     * Обработчик нажатия на строку.
     * При нажатии на строку, она становится выделенной.
     * Для этого обогащаем модль хаписи атрибутом isSelected, который сохраняется только в локальном стейте компонента.
     */
    const handleRowClick = (event) => {
        const recordId = event.target.closest("tr").dataset.id;
        const updatedRecord = enrichedRecords.find((r) => r._id === recordId);
        updatedRecord.isSelected = !updatedRecord.isSelected;
        const updatedRecords = enrichedRecords.map((r) => r._id === recordId ? updatedRecord : r);
        setEnrichedRecords(updatedRecords);
    };

    /**
     * Обработчик нажатия на кнопку "Сохранить".
     */
    const handeCreateResultsClick = (event) => {
        event.preventDefault();
        const recordsToUpdate = [];
        const positionElements = event.target.closest(".results").getElementsByClassName("position");
        const positionMap = {};

        for (let i = 0; i < positionElements.length; i++) {
            const positionValue = positionElements[i].getElementsByTagName("input")[0].value;
            positionMap[positionElements[i].dataset.id] = positionValue;
        }

        getFilteredRecords(records, isMoviesSelected).forEach((record) => {
            const id = record._id;
            const oldValue = record.position;
            const newValue = positionMap[record._id];


            if (oldValue !== newValue) {
                recordsToUpdate.push({
                    id,
                    position: positionMap[id],
                    viewdate: "2020-12-27T21:00:00.000Z", // TODO: изменить в зависимости от выбранного года
                    userId
                });
            }
        });

        if (isEditModeClicked) {
            setEditModeClicked(false);
        }

        dispatch(updateRecords(recordsToUpdate));
    };

    /**
     * Обработчик нажатия на кнопку "Редактировать".
     */
    const handleEditResultsClick = () => {
        setEditModeClicked(true);
    };

    /**
     * Рисует содержимое страницы.
     */
    const renderContent = () => {
        /**
         * Итоги уже существуют.
         */
        if (isResultsExist && !isEditModeClicked) {
            return (
                <>
                    {getFilteredRecords(records, isMoviesSelected)
                        .filter((record) => record.position)
                        .sort(compareRecordsByPosition)
                        .map((record) => (
                            <Record
                                isReadonly
                                key={record._id}
                                {...record}
                            />
                        ))
                    }
                    <a href="#" onClick={handleEditResultsClick}>Редактировать</a>
                </>
            );
            /**
             * Итогов ещё нет.
             */
        } else {
            /**
             * У пользователя нет записей в журнале за этот год.
             */
            if (isRecordsEmpty) {
                return (
                    <>
                        <Message info>
                            <p>В вашем журнале нет ни одной записи за текущий год.</p>
                        </Message>
                        <Link to={`/diary/${userId}`} key="diary">Перейти к журналу</Link>
                    </>
                );
                /**
                 * У пользователя есть записи в журнале за этот год.
                 */
            } else {
                return (
                    <>
                        <Message info>
                            <p>Расcтавьте позиции в таблице ниже и нажмите кнопку &#34;Сохранить&#34;</p>
                        </Message>
                        {!isEmpty(enrichedRecords) && (
                            <Table className="results-table" celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Позиция</Table.HeaderCell>
                                        <Table.HeaderCell>Наименование</Table.HeaderCell>
                                        <Table.HeaderCell>Оценка</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {getFilteredRecords(enrichedRecords, isMoviesSelected).map((record) => {
                                        return (
                                            <Table.Row
                                                data-id={record._id}
                                                key={record._id}
                                                onClick={handleRowClick}
                                                className={`${record.isSelected ? "selected" : ""}`
                                                }>
                                                <Table.Cell collapsing>
                                                    <Input
                                                        data-id={record._id}
                                                        className="position"
                                                        maxLength="2"
                                                        onClick={(e) => e.stopPropagation()}
                                                        onChange={(e) => {
                                                            setEditModeClicked(true);
                                                            const newRecords = [...enrichedRecords];
                                                            const newRecordIndex = newRecords.findIndex((nr) => nr._id === record._id);
                                                            const newRecord = {
                                                                ...newRecords.find((enrichedRecord) => enrichedRecord._id === record._id),
                                                                position: e.target.value
                                                            };
                                                            newRecords[newRecordIndex] = newRecord;
                                                            setEnrichedRecords(newRecords);
                                                        }}
                                                        value={record.position}
                                                    />
                                                </Table.Cell>
                                                <Table.Cell>{record.title}</Table.Cell>
                                                <Table.Cell className={record.rating === "0" ? "red" : ""}>{record.rating}</Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                            </Table>
                        )}
                        <a href="#" onClick={handeCreateResultsClick}>Сохранить</a>
                    </>
                );
            }
        }
    };

    return (
        <Page asyncDataKeys={["records"]}>
            <Container className="results">
                <Header as="h2" size='large'>Итоги</Header>
                <YearsSelect selectedYear={year} onSelect={(event, data) => setYear(data.value)}/>&nbsp;&nbsp;&nbsp;
                <span
                    className={`record-filter ${isMoviesSelected ? "" : "not-selected"}`}
                    onClick={() => setMoviesSelected(true)}
                    title={"Показать фильмы"}
                >
                    Фильмы
                </span>&nbsp;&nbsp;&nbsp;
                <span
                    className={`record-filter ${!isMoviesSelected ? "" : "not-selected"}`}
                    onClick={() => setMoviesSelected(false)}
                    title={"Показать сериалы"}
                >
                    Сериалы
                </span>&nbsp;&nbsp;&nbsp;
                {renderContent()}
            </Container>
        </Page>
    );
};

import {getRecords} from "../Actions/Actions";
import {Container, Header, Input, Message, Table} from "semantic-ui-react";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Page} from "./../Components/Common/Page";
import {YearsSelect} from "../Components/YearsSelect";
import {CLEAR_RECORDS} from "./../Actions/ActionTypes";
import {DEFAULT_RECORDS_FILTER} from "./../Consts";

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
    const {records: {data: records}, user: {data: {years}}} = useSelector(state => state);
    const [isMoviesSelected, setMoviesSelected] = useState(true);
    const [enrichedRecords, setEnrichedRecords] = useState(null);

    useEffect(() => {
        dispatch(getRecords(profileUserId, DEFAULT_RECORDS_FILTER));
        return () => {
            dispatch({type: CLEAR_RECORDS});
        };
    }, [dispatch, profileUserId]);

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
     * Обработчик нажатия на кнопку "Создать итоги".
     */
    const handeCreateResultsClick = (event) => {
        event.preventDefault();
        const positionElements = event.target.closest(".results").getElementsByClassName("position");
        const positionMap = {};
        for (let i = 0; i < positionElements.length; i++) {
            const positionValue = positionElements[i].getElementsByTagName("input")[0].value;
            if (positionValue !== "") {
                positionMap[positionElements[i].dataset.id] = positionValue;
            }
        }
        // TODO: Выполняем запрос, добавляем атрибуты с позицией к записи
    };

    return (
        <Page asyncDataKeys={["records"]}>
            <Container className="results">
                <Header as="h2" size='large'>Итоги</Header>
                <YearsSelect years={years} />&nbsp;&nbsp;&nbsp;
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
                <Message info>
                    <Message.Header>Итоги ещё не сформированы</Message.Header>
                    <p>Расcтавьте позиции в таблице ниже и нажмите кнопку &#34;Создать итоги&#34;</p>
                </Message>

                {enrichedRecords && (
                    <Fragment>
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
                                                />
                                            </Table.Cell>
                                            <Table.Cell>{record.title}</Table.Cell>
                                            <Table.Cell className={record.rating === "0" ? "red" : ""}>{record.rating}</Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table>
                        <a href="#" onClick={handeCreateResultsClick}>Создать итоги</a>
                    </Fragment>
                )}
            </Container>
        </Page>
    );
};

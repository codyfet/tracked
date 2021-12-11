import {getRecords, updateRecords} from "../Actions/Actions";
import {Container, DropdownProps, Header, Input, Message, Table} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Page} from "../Components/Common/Page";
import {YearsSelect} from "../Components/YearsSelect";
import {CLEAR_RECORDS} from "../Actions/ActionTypes";
import {CURRENT_YEAR, DEFAULT_RECORDS_FILTER} from "../Consts";
import {isEmpty} from "lodash";
import {Link, RouteComponentProps} from "react-router-dom";
import {Record} from "../Components/Record";
import {IClientRecord} from "../Interfaces/ClientRecord";
import {IApplicationReduxState} from "../Reducers";
import {ERecordType} from "../Enums";

/**
 * Сравнивает объекты записи по значению Position.
 */
function compareRecordsByPosition(a: IClientRecord, b: IClientRecord) {
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
 * @param {IClientRecord[]} records Массив записей.
 * @param {boolean} isMoviesSelected Признак того, чтоб выбрано представление для фильмов.
 */
const getFilteredRecords = (records: IClientRecord[], isMoviesSelected: boolean) => {
    const type = isMoviesSelected ? ERecordType.MOVIE : ERecordType.TV_SERIES;

    return records.filter((record) => record.type === type);
};

type TParams = {id: string};

/**
 * Страница Итоги.
 */
export const Results = ({match}: RouteComponentProps<TParams>) => {
    const dispatch = useDispatch();
    const profileUserId = match.params.id;
    const {
        records: {data: records, isLoading: isRecordsLoading, error: recordsError},
        user: {data: userData},
    } = useSelector((state: IApplicationReduxState) => state);
    const [isMoviesSelected, setMoviesSelected] = useState(true);
    const [enrichedRecords, setEnrichedRecords] = useState(null);
    const [isEditModeClicked, setEditModeClicked] = useState(false);
    const [year, setYear] = useState(CURRENT_YEAR);
    const isRecordsEmpty = isEmpty(enrichedRecords);
    const isResultsExist =
        !isRecordsEmpty &&
        records?.some(
            (r) =>
                r.position &&
                r.type === (isMoviesSelected ? ERecordType.MOVIE : ERecordType.TV_SERIES)
        );

    useEffect(() => {
        const filter = {
            ...DEFAULT_RECORDS_FILTER,
            year,
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
    const handleRowClick = (event: React.MouseEvent<HTMLElement>) => {
        const recordId = event.currentTarget.closest("tr").dataset.id;
        const updatedRecord = enrichedRecords.find((r: IClientRecord) => r._id === recordId);
        updatedRecord.isSelected = !updatedRecord.isSelected;
        const updatedRecords = enrichedRecords.map((r: IClientRecord) =>
            r._id === recordId ? updatedRecord : r
        );
        setEnrichedRecords(updatedRecords);
    };

    /**
     * Обработчик нажатия на кнопку "Сохранить".
     */
    const handeCreateResultsClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const recordsToUpdate: Pick<IClientRecord, "_id" | "position" | "viewdate" | "userId">[] =
            [];
        const positionElements = event.currentTarget
            .closest(".results")
            .getElementsByClassName("position");
        const positionMap: {[id: string]: string} = {};

        for (let i = 0; i < positionElements.length; i++) {
            const positionValue = positionElements[i].getElementsByTagName("input")[0].value;
            const htmlElement: HTMLElement = positionElements[i] as HTMLElement;
            positionMap[htmlElement.dataset.id] = positionValue;
        }

        getFilteredRecords(records, isMoviesSelected).forEach((record) => {
            const {_id, position} = record;
            const oldValue = position;
            const newValue = positionMap[_id];

            if (oldValue !== newValue) {
                recordsToUpdate.push({
                    _id,
                    position: positionMap[_id],
                    viewdate: new Date(new Date().setFullYear(year)),
                    userId: userData.userId,
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
                            <Record isReadOnly isPositionMode key={record._id} {...record} />
                        ))}
                    <a href="#" onClick={handleEditResultsClick}>
                        Редактировать
                    </a>
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
                        <Link to={`/diary/${userData.userId}`} key="diary">
                            Перейти к журналу
                        </Link>
                    </>
                );
                /**
                 * У пользователя есть записи в журнале за этот год.
                 */
            } else {
                return (
                    <>
                        <Message info>
                            <p>
                                Расcтавьте позиции в таблице ниже и нажмите кнопку
                                &#34;Сохранить&#34;
                            </p>
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
                                    {getFilteredRecords(enrichedRecords, isMoviesSelected).map(
                                        (record) => {
                                            return (
                                                <Table.Row
                                                    data-id={record._id}
                                                    key={record._id}
                                                    onClick={handleRowClick}
                                                    className={`${
                                                        record.isSelected ? "selected" : ""
                                                    }`}
                                                >
                                                    <Table.Cell collapsing>
                                                        <Input
                                                            data-id={record._id}
                                                            className="position"
                                                            maxLength="2"
                                                            onClick={(
                                                                e: React.MouseEvent<HTMLElement>
                                                            ) => e.stopPropagation()}
                                                            onChange={(e) => {
                                                                setEditModeClicked(true);
                                                                const newRecords = [
                                                                    ...enrichedRecords,
                                                                ];
                                                                const newRecordIndex =
                                                                    newRecords.findIndex(
                                                                        (nr) =>
                                                                            nr._id === record._id
                                                                    );
                                                                const newRecord = {
                                                                    ...newRecords.find(
                                                                        (enrichedRecord) =>
                                                                            enrichedRecord._id ===
                                                                            record._id
                                                                    ),
                                                                    position: e.target.value,
                                                                };
                                                                newRecords[newRecordIndex] =
                                                                    newRecord;
                                                                setEnrichedRecords(newRecords);
                                                            }}
                                                            value={record.position}
                                                        />
                                                    </Table.Cell>
                                                    <Table.Cell>{record.title}</Table.Cell>
                                                    <Table.Cell
                                                        className={record.rating === 0 ? "red" : ""}
                                                    >
                                                        {record.rating}
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        }
                                    )}
                                </Table.Body>
                            </Table>
                        )}
                        <a href="#" onClick={handeCreateResultsClick}>
                            Сохранить
                        </a>
                    </>
                );
            }
        }
    };

    return (
        <Page isLoading={isRecordsLoading} errorMessage={recordsError?.message}>
            {() => (
                <Container className="results">
                    <Header as="h2" size="large">
                        Итоги
                    </Header>
                    <YearsSelect
                        selectedYear={year}
                        onSelect={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) =>
                            setYear(data.value as number)
                        }
                    />
                    &nbsp;&nbsp;&nbsp;
                    <span
                        className={`record-filter ${isMoviesSelected ? "" : "not-selected"}`}
                        onClick={() => setMoviesSelected(true)}
                        title={"Показать фильмы"}
                    >
                        Фильмы
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span
                        className={`record-filter ${!isMoviesSelected ? "" : "not-selected"}`}
                        onClick={() => setMoviesSelected(false)}
                        title={"Показать сериалы"}
                    >
                        Сериалы
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    {renderContent()}
                </Container>
            )}
        </Page>
    );
};

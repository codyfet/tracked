import React, {Fragment, useState} from "react";
import {useDispatch} from "react-redux";
import {ORDER_RECORDS_BY, REMOVE_RECORD, UPDATE_RECORD} from "../Actions/ActionTypes";
import {MoviesSelect} from "./MoviesSelect";
import {Flag, Grid, Icon, Image, Input, Segment} from "semantic-ui-react";
import {SimpleDialog} from "./SimpleDialog";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import {getFormattedDate} from "../Utils/DateUtils";
import {IMAGE_URL} from "../Consts";

import "react-datepicker/dist/react-datepicker.css";

/**
 * Компонент карточка фильма.
 */
export const Record = ({
    id,
    viewdate,
    posterpath,
    title,
    releaseYear,
    originalTitle,
    director,
    genres,
    rating,
    type,
    production_countries,
    reViewed,
    notFinished,
}) => {
    const isEmptyRecord = (id === "0");
    const dispatch = useDispatch();

    const [isRemoveDialogVisible, toggleRemoveDialog] = useState(false);
    const [isEditModeViewdateEnabled, setEditModeViewdateEnabled] = useState(false);
    const [isEditModeRatingEnabled, setEditModeRatingEnabled] = useState(false);

    /**
     * Обработчик закрытия модального окна подтверждения удаления записи.
     */
    const toggleRemoveDialogFunc = () => {
        toggleRemoveDialog(!isRemoveDialogVisible);
    };

    /**
     * Переключает режим редактирования для поля Рейтинг.
     */
    const toggleRatingEditMode = () => setEditModeRatingEnabled(!isEditModeRatingEnabled);

    /**
     * Переключает режим редактирования для поля Дата просмотра.
     */
    const toggleViewdateEditMode = () => setEditModeViewdateEnabled(!isEditModeViewdateEnabled);

    /**
     * Удаляет запись.
     */
    const removeRecord = () => dispatch({type: REMOVE_RECORD, payload: {id}});

    /**
     * Рисует дату просмотра.
     */
    const renderViewdate = () => {
        if (isEmptyRecord) {
            return null;
        }

        if (isEditModeViewdateEnabled) {
            const CustomInput = ({value, onClick, onChange, onBlur}) => (
                <Input className="datepicker-input" value={value} onClick={onClick} onChange={onChange} onBlur={onBlur} />
            );

            return (
                <DatePicker
                    dateFormat="d MMMM"
                    locale={ru}
                    selected={viewdate}
                    onChange={(viewdate) => {
                        dispatch({type: UPDATE_RECORD, payload: {id, viewdate}});
                        dispatch({type: ORDER_RECORDS_BY, payload: "viewdate"});
                        toggleViewdateEditMode();
                    }}
                    customInput={<CustomInput  />}
                    onBlur={toggleViewdateEditMode}
                />
            );
        }

        return <span onClick={toggleViewdateEditMode}>{getFormattedDate(viewdate)}</span>;
    };

    /**
     * Рисует постер.
     */
    const renderPoster = () => {
        if (isEmptyRecord) {
            return null;
        }

        return <Image src={`${IMAGE_URL}/${posterpath}`} size='tiny' />;
    };

    /**
     * Рисует основную информацию.
     */
    const renderMainInfo = () => {
        if (isEmptyRecord) {
            return <MoviesSelect />;
        }

        return (
            <Fragment>
                <div className="title">
                    {`${title} (${releaseYear})`}
                </div>
                <div className="additional-info">
                    {<span>{originalTitle} <span className="director">реж. {director}</span></span>}
                </div>
                <div className="genre">
                    {genres.map((genre) => genre.name).join(", ")}
                </div>
            </Fragment>
        );
    };

    /**
     * Рисует флаги стран производителей.
     */
    const renderFlags = () => {
        if (isEmptyRecord) {
            return null;
        }

        return production_countries.map(
            (country) => <Flag key={country.iso_3166_1} name={country.iso_3166_1.toLowerCase()} />
        );
    };

    /**
     * Рисует пооле Рейтинг.
     */
    const renderRating = () => {
        if (isEditModeRatingEnabled) {
            return (
                <Input
                    className="edit-mode-rating"
                    value={rating}
                    autoFocus
                    onChange={(e) => dispatch({type: UPDATE_RECORD, payload: {id, rating: e.target.value}})}
                    onFocus={e => e.currentTarget.select()}
                    onBlur={toggleRatingEditMode}
                />
            );
        }

        return <span className="rating" onClick={toggleRatingEditMode}>{rating}</span>;
    };

    /**
     * Рисует панель с иконками-действиями.
     */
    const renderIconsPanel = () => {
        const icons = [];

        if (!isEmptyRecord) {
            icons.push(
                <Icon
                    key="reViewed"
                    name='adjust'
                    onClick={() => dispatch({type: UPDATE_RECORD, payload: {id, reViewed: !reViewed}})}
                    title="не досмотрен"
                    color={reViewed ? "black" : "grey"}
                />,
                <Icon
                    key="notFinished"
                    name='sync alternate'
                    onClick={() => dispatch({type: UPDATE_RECORD, payload: {id, notFinished: !notFinished}})}
                    title="повторный просмотр"
                    color={notFinished ? "black" : "grey"}
                />
            );
        }

        icons.push(
            <Icon
                key="remove"
                name='remove'
                onClick={isEmptyRecord ? removeRecord : toggleRemoveDialogFunc}
                title="удалить запись"
            />
        );

        return <span className="icons-panel">{icons}</span>;
    };

    return (
        <Fragment>
            <Segment className={`record ${type === "movie" ? "blue-bg" : "violet-bg"}`} id={id}>
                <Grid verticalAlign="middle">
                    <Grid.Column width={2} textAlign="center" className="column-viewdate">
                        {renderViewdate()}
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                        {renderPoster()}
                    </Grid.Column>
                    <Grid.Column width={8} className="column-title">
                        {renderMainInfo()}
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                        {renderFlags()}
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                        {renderRating()}
                    </Grid.Column>
                </Grid>
                {renderIconsPanel()}
            </Segment>

            {isRemoveDialogVisible && (
                <SimpleDialog
                    header="Удаление записи"
                    text="Вы уверены, что хотите удалить запись?"
                    onClose={toggleRemoveDialogFunc}
                    onNegative={toggleRemoveDialogFunc}
                    onPositive={removeRecord}
                />
            )}
        </Fragment>
    );
};

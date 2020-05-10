import React, {Fragment, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {REMOVE_RECORD, UPDATE_RECORD} from '../Actions/ActionTypes';
import {MoviesSelect} from './MoviesSelect';
import {Flag, Grid, Icon, Image, Input, Segment} from 'semantic-ui-react';
import {SimpleDialog} from './SimpleDialog';
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import {getFormattedDate} from '../Utils/DateUtils';

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
    genreIds,
    flag,
    rating,
    type
}) => {
    const isEmptyRecord = (id === '0');
    const dispatch = useDispatch();

    const [isRemoveDialogVisible, toggleRemoveDialog] = useState(false);
    const [isEditModeViewdateEnabled, setEditModeViewdateEnabled] = useState(false);
    const [isEditModeRatingEnabled, setEditModeRatingEnabled] = useState(false);
    const {genresDictionary} = useSelector(state => state);

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

        return <Image src={`http://image.tmdb.org/t/p/w92/${posterpath}`} size='tiny' />;
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
                    {genreIds.map((id) => genresDictionary[id]).join(', ')}
                </div>
            </Fragment>
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

    return (
        <Fragment>
            <Segment className={`record ${type === 'movie' ? 'blue-bg' : 'violet-bg'}`} id={id}>
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
                        <Flag name={flag} />
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                        {renderRating()}
                    </Grid.Column>
                </Grid>
                {!isEmptyRecord && <Icon className="remove-record" name='remove' onClick={toggleRemoveDialogFunc} />}
            </Segment>

            {isRemoveDialogVisible && (
                <SimpleDialog
                    header="Удаление записи"
                    text="Вы уверены, что хотите удалить запись?"
                    onClose={toggleRemoveDialogFunc}
                    onNegative={toggleRemoveDialogFunc}
                    onPositive={() => dispatch({type: REMOVE_RECORD, payload: {id}})}
                />
            )}
        </Fragment>
    );
};

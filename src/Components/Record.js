import React, {Fragment, useState} from 'react';
import {useDispatch} from 'react-redux'
import {REMOVE_RECORD, UPDATE_RECORD} from '../Actions/ActionTypes';
import {MoviesSelect} from './MoviesSelect';
import {Flag, Grid, Icon, Image, Input, Segment} from 'semantic-ui-react';
import {SimpleDialog} from './SimpleDialog';

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
    genre,
    flag,
    rating,
    type
}) => {
    const isEmptyRecord = (id === '0');
    const dispatch = useDispatch();

    const [isRemoveDialogVisible, toggleRemoveDialog] = useState(false);
    const [currentSelectedRecordId, setCurrentSelectedRecordId] = useState(null);
    const [isEditModeEnabled, setEditModeEnabled] = useState(false);

    /**
     * Обработчик закрытия модального окна подтверждения удаления записи.
     */
    const toggleRemoveDialogFunc = (e) => {
        toggleRemoveDialog(!isRemoveDialogVisible);
        setCurrentSelectedRecordId(e.target.parentElement.id)
    }

    /**
     * Переключает режим редактирования для поля Рейтинг.
     */
    const toggleRatingEditMode = () => setEditModeEnabled(!isEditModeEnabled);

    /**
     * Рисует постер.
     */
    const renderPoster = () => {
        if (isEmptyRecord) {
            return null;
        }

        return <Image src={`http://image.tmdb.org/t/p/w92/${posterpath}`} size='tiny' />;
    }

    /**
     * Рисует наименование.
     */
    const renderTitle = () => {
        if (isEmptyRecord) {
            return <MoviesSelect />;
        }

        return `${title} (${releaseYear})`;
    }

    /**
     * Рисует доп. информацию.
     */
    const renderAdditionalInfo = () => {
        if (isEmptyRecord) {
            return null;
        }

        return <span>{originalTitle} <span className="director">реж. {director}</span></span>;
    }

    /**
     * Рисует пооле Рейтинг.
     */
    const renderRating = () => {
        if (isEditModeEnabled) {
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
    }

    return (
        <Fragment>
            <Segment className={`record ${type === 'movie' ? 'blue-bg' : 'violet-bg'}`} id={id}>
                <Grid verticalAlign="middle">
                    <Grid.Column width={2} textAlign="center">
                        <span>{viewdate}</span>
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                        {renderPoster()}
                    </Grid.Column>
                    <Grid.Column width={8} className="column-title">
                        <div className="title">{renderTitle()}</div>
                        <div className="additional-info">{renderAdditionalInfo()}</div>
                        <div className="genre">{genre}</div>
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                        <Flag name={flag} />
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                        {renderRating()}
                    </Grid.Column>
                </Grid>
                <Icon className="remove-record" name='remove' onClick={toggleRemoveDialogFunc} />
            </Segment>

            {isRemoveDialogVisible && (
                <SimpleDialog
                    header="Удаление записи"
                    text="Вы уверены, что хотите удалить запись?"
                    onClose={toggleRemoveDialogFunc}
                    onNegative={toggleRemoveDialogFunc}
                    onPositive={() => dispatch({type: REMOVE_RECORD, payload: {id: currentSelectedRecordId}})}
                />
            )}
        </Fragment>
    );
};

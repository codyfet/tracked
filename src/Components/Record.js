import React, {Fragment, useState} from 'react';
import {useDispatch} from 'react-redux'
import {REMOVE_RECORD} from '../Actions/ActionTypes';
import {MoviesSelect} from './MoviesSelect';
import {Grid, Segment, Flag, Image, Icon} from 'semantic-ui-react';
import {SimpleDialog} from './SimpleDialog';

/**
 * Компонент карточка фильма.
 */
export const Record = ({
    id,
    viewdate,
    // posterpath,
    title,
    releaseYear,
    originalTitle,
    director,
    genre,
    flag,
    rating
}) => {
    const dispatch = useDispatch();

    const [isRemoveDialogVisible, toggleRemoveDialog] = useState(false);
    const [currentSelectedRecordId, setCurrentSelectedRecordId] = useState(null);

    // Обработчик закрытия модального окна подтверждения удаления записи.
    const toggleRemoveDialogHandler = (e) => {
        toggleRemoveDialog(!isRemoveDialogVisible);
        setCurrentSelectedRecordId(e.target.parentElement.id)
    }

    // Обработчик удаления записи.
    const removeRecordHandler = () => dispatch({type: REMOVE_RECORD, payload: {id: currentSelectedRecordId}});

    const isEmptyRecord = id === '0';

    /**
     * Рисует постер.
     */
    const renderPoster = () => {
        const path = isEmptyRecord ? 'src/Assets/default.png' : 'src/Assets/sniper.jpg';

        return <Image src={path} size='tiny' />;
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

    return (
        <Fragment>
            <Segment className={`record ${isEmptyRecord ? '' : 'blue-bg'}`} id={id}>
                <Grid verticalAlign="middle">
                    <Grid.Column width={2} textAlign="center">
                        <span>{viewdate}</span>
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                        {renderPoster()}
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <div className="title">{renderTitle()}</div>
                        <div className="additional-info">{renderAdditionalInfo()}</div>
                        <div className="genre">{genre}</div>
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                        <Flag name={flag} />
                    </Grid.Column>
                    <Grid.Column width={1} textAlign="center">
                        <span className="rating">{rating}</span>
                    </Grid.Column>
                </Grid>
                <Icon className="remove-record" name='remove' onClick={toggleRemoveDialogHandler} />
            </Segment>

            {isRemoveDialogVisible && (
                <SimpleDialog
                    header="Удаление записи"
                    text="Вы уверены, что хотите удалить запись?"
                    onClose={toggleRemoveDialogHandler}
                    onNegative={toggleRemoveDialogHandler}
                    onPositive={removeRecordHandler}
                />
            )}
        </Fragment>
    );
};

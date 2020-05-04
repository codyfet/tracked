import React, {Fragment, useState} from 'react';
import {useDispatch} from 'react-redux'
import {REMOVE_RECORD} from '../Actions/ActionTypes';

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

    const [isRemoveDialogVisible, toggleRemoveDialog] = useState(false);
    const [currentSelectedRecordId, setCurrentSelectedRecordId] = useState(null);

    const toggleRemoveDialogHandler = (e) => {
        toggleRemoveDialog(!isRemoveDialogVisible);
        setCurrentSelectedRecordId(e.target.parentElement.id)
    }

    const dispatch = useDispatch();
    const removeRecordHandler = () => dispatch({type: REMOVE_RECORD, payload: {id: currentSelectedRecordId}});

    return (
        <Fragment>
            <Segment className="record blue-bg" id={id}>
                <Grid verticalAlign="middle">
                    <Grid.Column width={2} textAlign="center">
                        <span>{viewdate}</span>
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                        <Image src='src/Assets/sniper.jpg' size='tiny' />
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <div className="title">{title} ({releaseYear})</div>
                        <div className="additional-info">{originalTitle}, <span className="director">реж. {director}</span></div>
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

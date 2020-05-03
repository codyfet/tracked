import React from 'react';
import {Grid, Segment, Flag, Image} from 'semantic-ui-react';

/**
 * Компонент карточка фильма.
 */
export const Record = () => (
    <Segment className="record blue-bg" >
        <Grid verticalAlign="middle">
            <Grid.Column width={2} textAlign="center">
                <span>30 апреля</span>
            </Grid.Column>
            <Grid.Column width={2} textAlign="center">
                <Image src='src/Assets/sniper.jpg' size='tiny' />
            </Grid.Column>
            <Grid.Column width={9}>
                <div className="title">Снайпер</div>
                <div className="additional-info">American Sniper, <span className="director">реж. Клинт Иствуд</span></div>
                <div className="genre">боевик, драма, военный</div>
            </Grid.Column>
            <Grid.Column width={2} textAlign="center">
                <Flag name='us' />
            </Grid.Column>
            <Grid.Column width={1} textAlign="center">
                <span className="rating">6</span>
            </Grid.Column>
        </Grid>
    </Segment>
);
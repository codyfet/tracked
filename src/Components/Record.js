import React from 'react';
import {Grid, Segment, Flag, Image} from 'semantic-ui-react';

/**
 * Компонент карточка фильма.
 */
export const Record = ({
    viewdate,
    // posterpath,
    title,
    releaseYear,
    originalTitle,
    director,
    flag,
    rating
}) => (
    <Segment className="record blue-bg" >
        <Grid verticalAlign="middle">
            <Grid.Column width={2} textAlign="center">
                <span>{viewdate}</span>
            </Grid.Column>
            <Grid.Column width={2} textAlign="center">
                <Image src='src/Assets/sniper.jpg' size='tiny' />
            </Grid.Column>
            <Grid.Column width={9}>
                <div className="title">{title}({releaseYear})</div>
                <div className="additional-info">{originalTitle}, <span className="director">реж. {director}</span></div>
                <div className="genre">боевик, драма, военный</div>
            </Grid.Column>
            <Grid.Column width={2} textAlign="center">
                <Flag name={flag} />
            </Grid.Column>
            <Grid.Column width={1} textAlign="center">
                <span className="rating">{rating}</span>
            </Grid.Column>
        </Grid>
    </Segment>
);

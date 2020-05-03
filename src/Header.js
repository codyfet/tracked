import React from 'react';
import {Container, Image, Input, Grid} from 'semantic-ui-react';

/**
 * Компонент шапка-приложения.
 */
export const Header = () => (
    <div className="header-wrapper">
        <Container className="header-menu">
            <Grid padded>
                <Grid.Column width={8}>
                    <Input icon='search' placeholder='Добавить фильм' fluid />
                </Grid.Column>

                <Grid.Column width={4}></Grid.Column>

                <Grid.Column width={4} floated="right">
                    <div className="avatar-block">
                        <Image size="mini" src='src/assets/matthew.png' avatar />
                        <span>Alexander Volkov</span>
                    </div>
                </Grid.Column>
            </Grid>
        </Container>
    </div>
);
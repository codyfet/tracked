import React from "react";
import {Container, Grid, Image, Segment} from "semantic-ui-react";

/**
 * Страница профиль пользователя.
 */
export const Profile = () => {
    return (
        <Container className="profile">
            <Segment >
                <Grid className="profile-data">
                    <Grid.Column width={4}>
                        <Image className="profile-data-image" src='src/Assets/matthew.png' circular />
                        <div className="title">Alexander Volkov</div>
                        <div className="additional">Russia, Tver</div>
                        <div className="label">В этом году</div>
                        <div className="counter">60</div>
                        <div className="label">За всё время</div>
                        <div className="counter">170</div>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        Здесь будет секция Любимые
                    </Grid.Column>
                </Grid>
            </Segment>

            <h1>За всё время</h1>
        </Container>
    );
};

import React from "react";
import {useSelector} from "react-redux";
import {Button, Grid} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {MovieItem} from "../Components/Icons/MovieItem";
import {StarItem} from "../Components/Icons/StarItem";
import {ChartItem} from "../Components/Icons/ChartItem";
import {IApplicationReduxState} from "../Reducers";

/**
 * Главная страница приложения.
 */
export const Main = () => {
    const {user} = useSelector((state: IApplicationReduxState) => state);
    const isAutheticated = user?.data;

    /**
     * Рисует кнопку в hero блоке.
     */
    const renderButton = () => {
        if (!isAutheticated) {
            return (
                <Button as={Link} to="/login" key="login">
                    Начать
                </Button>
            );
        } else {
            return (
                <Button as={Link} to={`/diary/${user.data.userId}`} key="diary">
                    Мой журнал
                </Button>
            );
        }
    };

    return (
        <div className="main">
            <div className="main-hero">
                <div className="appname">tracked</div>
                <div className="description">Журнал для учёт просмотренных фильмов и сериалов</div>
                <div className="start-button">{renderButton()}</div>
            </div>
            <div className="main-items">
                <Grid className="items" columns={3} textAlign="center">
                    <Grid.Row>
                        <Grid.Column>
                            <MovieItem className="item-icon" />
                            <div className="item-title">Фильмы</div>
                            <div className="item-description">
                                Отмечайте просмотренные фильмы и сериалы.
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <StarItem className="item-icon" />
                            <div className="item-title">Оценки</div>
                            <div className="item-description">Ставьте оценки.</div>
                        </Grid.Column>
                        <Grid.Column>
                            <ChartItem className="item-icon" />
                            <div className="item-title">Статистика</div>
                            <div className="item-description">
                                Просматривайте статистику ваших просмотров.
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    );
};

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Grid, Header, Image, List, Segment} from "semantic-ui-react";
import {Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {getStat, getUsers, updateUser} from "../Actions/Actions";
import {CustomizedAxisTick} from "../Components/Charts/CustomizedAxisTick";
import {FavouriteMovie} from "../Components/FavouriteMovie";
import {CLEAR_USERS} from "../Actions/ActionTypes";
import {Link} from "react-router-dom";
import {Page} from "../Components/Common/Page";
import {YearsSelect} from "../Components/YearsSelect";

/**
 * Всплывающий тултип, при наведении на график "Жанры".
 */
const CustomGenreTooltip = ({active, payload, label}) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`Фильмов в жанре ${label}: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

/**
 * Всплывающий тултип, при наведении на график "Страны".
 */
const CustomCountryTooltip = ({active, payload, label}) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`Фильмов производства ${label}: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

/**
 * Страница профиль пользователя.
 */
export const Profile = ({match}) => {
    const dispatch = useDispatch();
    const profileUserId = match.params.id;
    const {
        users: {data: usersData},
        stat: {data: statData},
        user: {data: loggedInUser},
    } = useSelector((state) => state);
    const profileUser = usersData ? usersData.items[0] : null;
    const marksData = statData?.marksData || [];
    const [year, setYear] = useState(0);

    useEffect(() => {
        dispatch(getUsers({userId: profileUserId}));

        return () => {
            dispatch({type: CLEAR_USERS});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(getStat(profileUserId, year));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year]);

    let favs = [];

    for (let i = 0; i < 10; i++) {
        favs.push(
            <FavouriteMovie
                movie={profileUser?.favouriteMovies[i]}
                index={i}
                onRemove={() => {
                    const updatedFavouriteMovies = profileUser?.favouriteMovies.map(
                        (item, index) => {
                            if (index === i) {
                                return null;
                            }
                            return item;
                        }
                    );
                    dispatch(
                        updateUser(profileUserId, {
                            favouriteMovies: updatedFavouriteMovies,
                        })
                    );
                }}
                disabled={profileUserId !== loggedInUser.userId}
            />
        );
    }

    return (
        <Page asyncDataKeys={["users", "stat"]}>
            <Container className="profile">
                <Header as="h2" size="large">
                    Профиль пользователя
                </Header>
                <Segment>
                    <Grid className="profile-data">
                        <Grid.Column width={4}>
                            <Image
                                className="profile-data-image"
                                src="../src/Assets/matthew.png"
                                circular
                            />
                            <div className="title">{`${profileUser?.username}`}</div>
                            <div className="additional">Russia, Tver</div>
                            <div className="label">В этом году</div>
                            <div className="counter">
                                <div className="total">
                                    {statData?.recordsCurrentYearCount.movies +
                                        statData?.recordsCurrentYearCount.tvseries}
                                </div>
                                <div className="divided">
                                    <div>{statData?.recordsCurrentYearCount.movies} фильмов</div>
                                    <div>{statData?.recordsCurrentYearCount.tvseries} сериалов</div>
                                </div>
                            </div>
                            <div className="label">За всё время</div>
                            <div className="counter">
                                <div className="total">
                                    {statData?.recordsTotalCount.movies +
                                        statData?.recordsTotalCount.tvseries}
                                </div>
                                <div className="divided">
                                    <div>{statData?.recordsTotalCount.movies} фильмов</div>
                                    <div>{statData?.recordsTotalCount.tvseries} сериалов</div>
                                </div>
                            </div>
                            <div>
                                <Link to={`/diary/${profileUserId}`}>Смотреть журнал</Link>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <div>Любимые фильмы</div>
                            <div className="grid-panel">{favs}</div>
                        </Grid.Column>
                    </Grid>
                </Segment>

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}></Grid.Column>
                        <Grid.Column width={8} textAlign="center">
                            <h1>
                                <YearsSelect
                                    showAllOption
                                    selectedYear={year}
                                    onSelect={(event, data) => setYear(data.value)}
                                />
                            </h1>
                            <h3>
                                {`${marksData.reduce((acc, cur) => (acc += cur.markCount), 0)}`}{" "}
                                оценок
                            </h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart margin={{top: 30}} data={marksData}>
                                    <Bar dataKey="markCount" fill="#5CE0E6">
                                        <LabelList dataKey="markCount" position="top" />
                                    </Bar>
                                    <XAxis dataKey="mark" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Grid.Column>
                        <Grid.Column width={4}></Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={8}>
                            <h3>Жанры</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    width={600}
                                    height={300}
                                    data={statData?.genresData}
                                    layout="vertical"
                                    margin={{top: 5, bottom: 5}}
                                >
                                    <XAxis type="number" />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        interval={0}
                                        width={150}
                                    />
                                    <Tooltip content={<CustomGenreTooltip />} />
                                    <Bar dataKey="value" fill="#19C2FA" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Grid.Column>
                        <Grid.Column width={8} textAlign="center">
                            <h3>Страны</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    width={600}
                                    height={300}
                                    data={statData?.countriesData}
                                    layout="vertical"
                                    margin={{top: 5, bottom: 5}}
                                >
                                    <XAxis type="number" />
                                    <YAxis
                                        type="category"
                                        dataKey="countryName"
                                        interval={0}
                                        width={150}
                                    />
                                    <Tooltip content={<CustomCountryTooltip />} />
                                    <Bar dataKey="countryCount" fill="#FA1955" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <h3>Режиссёры</h3>
                            <List ordered>
                                {statData?.directorsData.map((item) => {
                                    return (
                                        <List.Item
                                            key={item.id}
                                        >{`${item.director} (${item.directorCount})`}</List.Item>
                                    );
                                })}
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Актёры</h3>
                            <List ordered>
                                {statData?.actorsData.map((item, index) => {
                                    return (
                                        <List.Item
                                            key={index}
                                        >{`${item.actor} (${item.actorCount})`}</List.Item>
                                    );
                                })}
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Актрисы</h3>
                            <List ordered>
                                {statData?.actressesData.map((item, index) => {
                                    return (
                                        <List.Item
                                            key={index}
                                        >{`${item.actress} (${item.actressCount})`}</List.Item>
                                    );
                                })}
                            </List>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <h3>Год выпуска</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart margin={{top: 30}} data={statData?.yearsData}>
                                    <Bar dataKey="yearCount" fill="#5CE0E6">
                                        <LabelList dataKey="yearCount" position="top" />
                                    </Bar>
                                    <XAxis
                                        dataKey="year"
                                        interval={0}
                                        height={100}
                                        tick={<CustomizedAxisTick />}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Page>
    );
};

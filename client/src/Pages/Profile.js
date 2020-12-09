import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Dropdown, Grid, Image, List, Segment} from "semantic-ui-react";
import {Bar, BarChart, Cell, LabelList, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {getStat, getUsers, updateUser} from "../Actions/Actions";
import {CustomizedAxisTick} from "../Components/Charts/CustomizedAxisTick";
import {map} from "lodash";
import {FavouriteMovie} from "./../Components/FavouriteMovie";
import {CLEAR_USERS} from "./../Actions/ActionTypes";

const COLORS = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"];

const RADIAN = Math.PI / 180;

/**
 * Рисует легенду для графика "Жанры".
 */
const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

/**
 * Страница профиль пользователя.
 */
export const Profile = ({match}) => {
    const dispatch = useDispatch();
    const profileUserId = match.params.id;
    const {
        users: {
            data: users
        },
        stat: {
            data: statData
        }
    } = useSelector(state => state);
    const profileUser = users ? users[0] : null;

    useEffect(() => {
        dispatch(getUsers(profileUserId));
        dispatch(getStat(profileUserId));

        return () => {
            dispatch({type: CLEAR_USERS});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    dispatch(updateUser(profileUserId, {favouriteMovies: updatedFavouriteMovies}));
                }}
            />
        );
    }

    /**
     * TODO: Нужно научить брать из статистики.
     */
    // const yearsOptions = [
    //     {key: "total", value: "total", text: "За всё время"},
    //     ...map(years, (year) => ({key: year, value: year, text: year}))
    // ];

    return (
        <Container className="profile">
            <Segment >
                <Grid className="profile-data">
                    <Grid.Column width={4}>
                        <Image className="profile-data-image" src='src/Assets/matthew.png' circular />
                        <div className="title">{`${profileUser?.username}`}</div>
                        <div className="additional">Russia, Tver</div>
                        <div className="label">В этом году</div>
                        <div className="counter">{statData?.recordsCurrentYearCount}</div>
                        <div className="label">За всё время</div>
                        <div className="counter">{statData?.recordsTotalCount}</div>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <div>Любимые фильмы</div>
                        <div className="grid-panel">
                            {favs}
                        </div>
                    </Grid.Column>
                </Grid>
            </Segment>

            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}></Grid.Column>
                    <Grid.Column width={8} textAlign="center">
                        <h1>
                            {/* TODO: Оживить после починик статистики. */}
                            {/* <Dropdown
                                inline
                                options={yearsOptions}
                                defaultValue={yearsOptions[0].value}
                                onChange={() => {}}
                            /> */}
                        </h1>
                        <h3>700 оценок</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart margin={{top: 30}} data={statData?.marksData}>
                                <Bar dataKey="markCount" fill="#5CE0E6" >
                                    <LabelList dataKey="markCount" position="top" />
                                </Bar>
                                <XAxis dataKey="mark" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid.Column>
                    <Grid.Column width={4}></Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={8} textAlign="center">
                        <h3>Жанры</h3>
                        <div className="genres-chart-wrapper">
                            <ResponsiveContainer height={300} width="100%">
                                <PieChart>
                                    <Pie
                                        data={statData?.genresData}
                                        cx={100}
                                        cy={100}
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={90}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {
                                            statData?.genresData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                        }
                                    </Pie>
                                    <Legend
                                        iconType="circle"
                                        layout="vertical"
                                        verticalAlign="top"
                                        align="left"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign="center">
                        <h3>Страны</h3>
                        <BarChart
                            width={600}
                            height={300}
                            data={statData?.countriesData}
                            layout="vertical"
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="country" interval={0} />
                            <Tooltip />
                            <Bar dataKey="countryCount" fill="#82ca9d" />
                        </BarChart>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={3}>
                    <Grid.Column>
                        <h3>Режиссёры</h3>
                        <List ordered>
                            {
                                statData?.directorsData.map((item) => {
                                    return (
                                        <List.Item>{`${item.director} (${item.directorCount})`}</List.Item>
                                    );
                                })
                            }
                        </List>
                    </Grid.Column>
                    <Grid.Column>
                        <h3>Актёры</h3>
                        <List ordered>
                            {
                                statData?.actorsData.map((item) => {
                                    return (
                                        <List.Item>{`${item.actor} (${item.actorCount})`}</List.Item>
                                    );
                                })
                            }
                        </List>
                    </Grid.Column>
                    <Grid.Column>
                        <h3>Актрисы</h3>
                        <List ordered>
                            {
                                statData?.actressesData.map((item) => {
                                    return (
                                        <List.Item>{`${item.actress} (${item.actressCount})`}</List.Item>
                                    );
                                })
                            }
                        </List>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <h3>Год выпуска</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart margin={{top: 30}} data={statData?.yearsData}>
                                <Bar dataKey="yearCount" fill="#5CE0E6" >
                                    <LabelList dataKey="yearCount" position="top" />
                                </Bar>
                                <XAxis dataKey="year" interval={0} height={100} tick={<CustomizedAxisTick />} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

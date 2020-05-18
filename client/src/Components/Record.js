import React, {Fragment} from "react";
import debounceAction from "debounce-action";
import {useDispatch} from "react-redux";
import {ORDER_RECORDS_BY, REMOVE_RECORD, UPDATE_RECORD} from "../Actions/ActionTypes";
import {TMDbSelect} from "./TMDbSelect";
import {Flag, Grid, Icon, Image, Input, Segment} from "semantic-ui-react";
import {SimpleDialog} from "./SimpleDialog";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import {getFormattedDate} from "../Utils/DateUtils";
import {IMAGE_URL} from "../Consts";
import {addDetailedMovieRecord, addDetailedTvSeriesRecord, searchMovies, searchTvSeries} from "../Actions/Actions";
import {useToggle} from "../Hooks/Toggle.hook";

import "react-datepicker/dist/react-datepicker.css";

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
    genres,
    rating,
    type,
    production_countries,
    reViewed,
    notFinished,
    season,
}) => {
    const isEmptyRecord = (id === "0");
    const isMovie = type === "movie";
    const isTvSeries = !isMovie;
    const dispatch = useDispatch();

    const [isRemoveDialogVisible, toggleRemoveDialog] = useToggle(false);
    const [isEditModeViewdateEnabled, toggleViewdateEditMode] = useToggle(false);
    const [isEditModeRatingEnabled, toggleRatingEditMode] = useToggle(false);
    const [isEditModeSeasonInfoEnabled, toggleSeasonInfoEditMode] = useToggle(false);

    /**
     * Удаляет запись.
     */
    const removeRecord = () => dispatch({type: REMOVE_RECORD, payload: {id}});

    /**
     * Рисует дату просмотра.
     */
    const renderViewdate = () => {
        if (isEmptyRecord) {
            return null;
        }

        if (isEditModeViewdateEnabled) {
            const CustomInput = ({value, onClick, onChange, onBlur}) => (
                <Input className="datepicker-input" value={value} onClick={onClick} onChange={onChange} onBlur={onBlur} />
            );

            return (
                <DatePicker
                    dateFormat="d MMMM"
                    locale={ru}
                    selected={viewdate}
                    onChange={(viewdate) => {
                        dispatch({type: UPDATE_RECORD, payload: {id, viewdate}});
                        dispatch({type: ORDER_RECORDS_BY, payload: "viewdate"});
                        toggleViewdateEditMode();
                    }}
                    customInput={<CustomInput  />}
                    onBlur={toggleViewdateEditMode}
                />
            );
        }

        return <span onClick={toggleViewdateEditMode}>{getFormattedDate(viewdate)}</span>;
    };

    /**
     * Рисует постер.
     */
    const renderPoster = () => {
        if (isEmptyRecord) {
            return null;
        }

        return <Image src={`${IMAGE_URL}/${posterpath}`} size='tiny' />;
    };

    /**
     * Рисует информацию о сезоне (для сериалов).
     */
    const renderSeasonInfo = () => {
        return isEditModeSeasonInfoEnabled ? (
            <Input
                className="edit-mode-season-info"
                value={season}
                autoFocus
                onChange={(e) => dispatch({type: UPDATE_RECORD, payload: {id, season: e.target.value}})}
                onFocus={(e) => e.currentTarget.select()}
                onBlur={toggleSeasonInfoEditMode}
                size="mini"
            />
        ) : (
            <span onClick={toggleSeasonInfoEditMode}>{", " + season + " сезон"}</span>
        );
    };

    /**
     * Рисует основную информацию.
     */
    const renderMainInfo = () => {
        if (isEmptyRecord) {
            const configProps = isMovie ? {
                searchAction: debounceAction(searchMovies, 300, {leading: true}),
                addDetailedRecordAction: addDetailedMovieRecord,
                titlePropName: "title",
                releasePropName: "release_date",
                placeholder: "Найти фильм..."
            } : {
                searchAction: debounceAction(searchTvSeries, 300, {leading: true}),
                addDetailedRecordAction: addDetailedTvSeriesRecord,
                titlePropName: "name",
                releasePropName: "first_air_date",
                placeholder: "Найти сериал..."
            };

            return <TMDbSelect {...configProps} />;
        }

        return (
            <Fragment>
                <div className="title">
                    {`${title} (${releaseYear})`}{isTvSeries ? renderSeasonInfo() : null}
                </div>
                <div className="additional-info">
                    {<span>{originalTitle} <span className="director">{`${isMovie ? "реж." : "создатели"}`} {director.join(", ")}</span></span>}
                </div>
                <div className="genre">
                    {genres.map((genre) => genre.name).join(", ")}
                </div>
            </Fragment>
        );
    };

    /**
     * Рисует флаги стран производителей.
     */
    const renderFlags = () => {
        if (isEmptyRecord) {
            return null;
        }

        return production_countries.map(
            (country) => <Flag key={country} name={country.toLowerCase()} />
        );
    };

    /**
     * Рисует поле Рейтинг.
     */
    const renderRating = () => {
        if (isEditModeRatingEnabled) {
            return (
                <Input
                    className="edit-mode-rating"
                    value={rating}
                    autoFocus
                    onChange={(e) => dispatch({type: UPDATE_RECORD, payload: {id, rating: e.target.value}})}
                    onFocus={(e) => e.currentTarget.select()}
                    onBlur={toggleRatingEditMode}
                />
            );
        }

        return <span className="rating" onClick={toggleRatingEditMode}>{rating}</span>;
    };

    /**
     * Рисует панель с иконками-действиями.
     */
    const renderIconsPanel = () => {
        let icons = [];

        if (!isEmptyRecord) {
            icons.push(
                <Icon
                    key="notFinished"
                    name='adjust'
                    onClick={() => dispatch({type: UPDATE_RECORD, payload: {id, notFinished: !notFinished}})}
                    title="не досмотрен"
                    color={notFinished ? "black" : "grey"}
                />,
                <Icon
                    key="reViewed"
                    name='sync alternate'
                    onClick={() => dispatch({type: UPDATE_RECORD, payload: {id, reViewed: !reViewed}})}
                    title="повторный просмотр"
                    color={reViewed ? "black" : "grey"}
                />,
            );
        }

        icons.push(
            <Icon
                key="remove"
                name='remove'
                onClick={isEmptyRecord ? removeRecord : toggleRemoveDialog}
                title="удалить запись"
            />
        );

        return <span className="icons-panel">{icons}</span>;
    };

    return (
        <Fragment>
            <Segment className={`record ${isMovie ? "blue-bg" : "violet-bg"}`} id={id}>
                <Grid verticalAlign="middle">
                    <Grid.Column width={2} textAlign="center" className="column-viewdate">
                        {renderViewdate()}
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                        {renderPoster()}
                    </Grid.Column>
                    <Grid.Column width={8} className="column-title">
                        {renderMainInfo()}
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                        {renderFlags()}
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                        {renderRating()}
                    </Grid.Column>
                </Grid>
                {renderIconsPanel()}
            </Segment>

            {isRemoveDialogVisible && (
                <SimpleDialog
                    header="Удаление записи"
                    text="Вы уверены, что хотите удалить запись?"
                    onClose={toggleRemoveDialog}
                    onNegative={toggleRemoveDialog}
                    onPositive={removeRecord}
                />
            )}
        </Fragment>
    );
};
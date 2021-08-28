import React, {Fragment} from "react";
import {useDispatch} from "react-redux";
import {ITMDbSelectProps, TMDbSelect} from "./TMDbSelect";
import {
    Flag,
    FlagNameValues,
    Grid,
    Image,
    Input,
    InputOnChangeData,
    Label,
    Segment,
} from "semantic-ui-react";
import {SimpleDialog} from "./Common/SimpleDialog";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import {getFormattedDate} from "../Utils/DateUtils";
import {IMAGE_URL} from "../Consts";
import {
    addDetailedMovieRecord,
    addDetailedTvSeriesRecord,
    deleteRecord,
    searchMovies,
    searchTvSeries,
    updateRecord,
} from "../Actions/Actions";
import {useToggle} from "../Hooks/Toggle.hook";
import {useUpdate} from "../Hooks/Update.hook";
import {DELETE_EMPTY_RECORD} from "../Actions/ActionTypes";
import {IconRemove} from "./Icons/IconRemove";

import "react-datepicker/dist/react-datepicker.css";
import {IClientRecord} from "../Interfaces/ClientRecord";
import {ERecordType} from "../Enums";
import debounceAction from "debounce-action";
import {ResultMovie, ResultTVSeries} from "../Interfaces/TMDBInterfaces";

interface ICustomInputProps {
    value: string;
    onClick: () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
    onBlur: () => void;
}

interface IProps extends IClientRecord {
    isReadonly?: boolean;
}
/**
 * Компонент карточка фильма.
 */
export const Record = ({
    _id,
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
    season,
    position,
    isReadonly,
}: IProps) => {
    const isEmptyRecord = _id === "0";
    const isMovie = type === ERecordType.MOVIE;
    const isTvSeries = !isMovie;
    const dispatch = useDispatch();

    const [isRemoveDialogVisible, toggleRemoveDialog] = useToggle(false);
    const [isEditModeViewdateEnabled, toggleViewdateEditMode] = useToggle(false);
    const [isEditModeRatingEnabled, toggleRatingEditMode] = useToggle(false);
    const [isEditModeSeasonInfoEnabled, toggleSeasonInfoEditMode] = useToggle(false);

    const [viewdateValue, setViewdateValue] = useUpdate<Date>(viewdate, (newValue) =>
        dispatch(updateRecord(_id, {viewdate: newValue}))
    );
    const [ratingValue, setRatingValue] = useUpdate<number>(rating, (newValue) =>
        dispatch(updateRecord(_id, {rating: newValue}))
    );
    const [seasonValue, setSeasonValue] = useUpdate<string>(season, (newValue) =>
        dispatch(updateRecord(_id, {season: newValue}))
    );

    /**
     * Удаляет пустую запись.
     */
    const removeEmptyRecord = () => dispatch({type: DELETE_EMPTY_RECORD});

    /**
     * Рисует дату просмотра.
     */
    const renderViewdate = () => {
        if (isEmptyRecord) {
            return null;
        }

        if (isEditModeViewdateEnabled) {
            const CustomInput = ({value, onClick, onChange, onBlur}: ICustomInputProps) => (
                <Input
                    className="datepicker-input"
                    value={value}
                    onClick={onClick}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            );

            return (
                <DatePicker
                    dateFormat="d MMMM"
                    locale={ru}
                    selected={viewdateValue}
                    onChange={(viewdate: Date) => {
                        if (!isReadonly) {
                            setViewdateValue(viewdate);
                            toggleViewdateEditMode();
                        }
                    }}
                    customInput={React.createElement(CustomInput)}
                    onBlur={toggleViewdateEditMode}
                />
            );
        }

        return (
            <span title="Нажите дважды, чтобы изменить" onClick={toggleViewdateEditMode}>
                {getFormattedDate(viewdate)}
            </span>
        );
    };

    /**
     * Рисует постер.
     */
    const renderPoster = () => {
        if (isEmptyRecord) {
            return null;
        }

        return <Image src={`${IMAGE_URL}/${posterpath}`} size="tiny" />;
    };

    /**
     * Рисует информацию о сезоне (для сериалов).
     */
    const renderSeasonInfo = () => {
        return !isReadonly && isEditModeSeasonInfoEnabled ? (
            <Input
                className="edit-mode-season-info"
                value={seasonValue}
                autoFocus
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSeasonValue(e.target.value)
                }
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.currentTarget.select()}
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
            const configProps: ITMDbSelectProps = isMovie
                ? {
                      searchAction: debounceAction(searchMovies, 300, {
                          leading: false,
                      }),
                      onSuggestionSelected: (suggestion: ResultMovie, userId: string) =>
                          dispatch(addDetailedMovieRecord(suggestion.id, userId)),
                      titlePropName: "title",
                      releasePropName: "release_date",
                      placeholder: "Найти фильм...",
                  }
                : {
                      searchAction: debounceAction(searchTvSeries, 300, {
                          leading: false,
                      }),
                      onSuggestionSelected: (suggestion: ResultTVSeries, userId: string) =>
                          dispatch(addDetailedTvSeriesRecord(suggestion.id, userId)),
                      titlePropName: "name",
                      releasePropName: "first_air_date",
                      placeholder: "Найти сериал...",
                  };

            return <TMDbSelect {...configProps} />;
        }

        return (
            <Fragment>
                <div className="title">
                    {`${title} (${releaseYear})`}
                    {isTvSeries ? renderSeasonInfo() : null}
                </div>
                <div className="additional-info">
                    {
                        <span>
                            {originalTitle}{" "}
                            <span className="director">
                                {`${isMovie ? "реж." : "создатели"}`} {director.join(", ")}
                            </span>
                        </span>
                    }
                </div>
                <div className="genre">{genres.map((genre) => genre.name).join(", ")}</div>
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

        return production_countries.map((country) => {
            return <Flag key={country} name={country as FlagNameValues} />;
        });
    };

    /**
     * Рисует поле Рейтинг.
     */
    const renderRating = () => {
        if (isEditModeRatingEnabled) {
            return (
                <Input
                    className="edit-mode-rating"
                    value={ratingValue}
                    autoFocus
                    onChange={(e) => {
                        if (!isReadonly) {
                            setRatingValue(+e.target.value);
                        }
                    }}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.currentTarget.select()}
                    onBlur={toggleRatingEditMode}
                />
            );
        }

        return (
            <span
                title="Нажите, чтобы изменить"
                className={`rating ${rating === 0 ? "red" : ""}`}
                onClick={toggleRatingEditMode}
            >
                {rating}
            </span>
        );
    };

    /**
     * Рисует панель с иконками-действиями.
     */
    const renderIconsPanel = () => {
        const icons = [];

        // if (!isEmptyRecord) {
        //     icons.push(
        //         <Icon
        //             key="notFinished"
        //             name='adjust'
        //             onClick={() => dispatch(updateRecord(_id, {notFinished: !notFinished}))}
        //             title="не досмотрен"
        //             color={notFinished ? "black" : "grey"}
        //         />,
        //         <Icon
        //             key="reViewed"
        //             name='sync alternate'
        //             onClick={() => dispatch(updateRecord(_id, {reViewed: !reViewed}))}
        //             title="повторный просмотр"
        //             color={reViewed ? "black" : "grey"}
        //         />,
        //     );
        // }

        icons.push(
            <IconRemove
                key="icon"
                title="удалить запись"
                onClick={isEmptyRecord ? removeEmptyRecord : toggleRemoveDialog}
            />
        );

        return <span className="icons-panel">{icons}</span>;
    };

    return (
        <Fragment>
            <Segment className={`record ${isMovie ? "blue-bg" : "violet-bg"}`} id={_id}>
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
                {!isReadonly && renderIconsPanel()}
                {isReadonly && (
                    <Label circular className="position" color="orange">
                        {position}
                    </Label>
                )}
            </Segment>

            {isRemoveDialogVisible && (
                <SimpleDialog
                    header="Удаление записи"
                    text="Вы уверены, что хотите удалить запись?"
                    onClose={toggleRemoveDialog}
                    onNegative={toggleRemoveDialog}
                    onPositive={() => dispatch(deleteRecord(_id))}
                />
            )}
        </Fragment>
    );
};

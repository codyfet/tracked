import React, {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SimpleModal} from "./Common/SimpleModal";
import {TMDbSelect} from "./TMDbSelect";
import {searchMovies, updateUser} from "../Actions/Actions";
import {Image} from "semantic-ui-react";
import {IMAGE_URL} from "../Consts";
import {IApplicationReduxState} from "../Reducers";
import {Result} from "../Interfaces/TMDBInterfaces";
import {IFavouriteMovie} from "../../../server/src/interfaces/FavouriteMovie";
import debounceAction from "debounce-action";

interface IProps {
    onClose: () => void;
    index: number;
}

/**
 * Модальное окно добавления любимого фильма.
 */
export const FavouriteMovieModal = ({onClose, index}: IProps) => {
    const [suggestion, setSuggestion] = useState(null);
    const {
        users: {data: usersData},
    } = useSelector((state: IApplicationReduxState) => state);
    const user = usersData ? usersData.items[0] : null;
    const dispatch = useDispatch();

    const content = (
        <Fragment>
            <div className="falvourite-movie-search">
                <TMDbSelect
                    searchAction={debounceAction(searchMovies, 300, {
                        leading: false,
                    })}
                    onSuggestionSelected={(selectedSuggestion: Result) =>
                        setSuggestion(selectedSuggestion)
                    }
                    titlePropName="title"
                    releasePropName="release_date"
                    placeholder="Найти фильм..."
                />
            </div>

            {suggestion && (
                <div className="movie-info">
                    <Image src={`${IMAGE_URL}/${suggestion.poster_path}`} size="tiny" />
                    <div className="title">
                        {`${suggestion.title} (${new Date(suggestion.release_date).getFullYear()})`}
                    </div>
                </div>
            )}
        </Fragment>
    );

    /**
     * Обработчик нажатия на кнопку "Добавить".
     */
    const handleSuccessClick = () => {
        const movie = {
            id: suggestion.id,
            title: suggestion.title,
            poster_path: suggestion.poster_path,
            release_date: suggestion.release_date,
        };

        const updatedFavouriteMovies: IFavouriteMovie[] = [...user?.favouriteMovies];
        updatedFavouriteMovies[index] = movie;

        dispatch(updateUser(user?._id, {favouriteMovies: updatedFavouriteMovies}));
        onClose();
    };

    return (
        <SimpleModal
            content={content}
            header="Выберите фильм"
            onClose={onClose}
            onSuccess={handleSuccessClick}
            successText="Добавить"
            successDisabled={!suggestion}
        />
    );
};

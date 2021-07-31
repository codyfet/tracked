import React, {Fragment, useState} from "react";
import {EmptyCard} from "./EmptyCard";
import {FavouriteMovieModal} from "./FavouriteMovieModal";
import {Icon, Image} from "semantic-ui-react";
import {IMAGE_URL} from "./../Consts";
import {useToggle} from "./../Hooks/Toggle.hook";
import {SimpleDialog} from "./Common/SimpleDialog";

/**
 * Компонент-карточка "Любимый фильм".
 */
export const FavouriteMovie = ({movie, index, onRemove, disabled}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isRemoveDialogVisible, toggleRemoveDialog] = useToggle(false);
    let card;

    if (movie) {
        card = (
            <div className="favourite-movie-poster">
                <Icon
                    name="remove circle"
                    onClick={toggleRemoveDialog}
                    title="удалить"
                    className="remove-icon"
                />
                <Image
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "../src/Assets/empty.png";
                    }}
                    src={`${IMAGE_URL}/${movie.poster_path}`}
                    title={`${movie.title} (${new Date(movie.release_date).getFullYear()})`}
                />
            </div>
        );
    } else {
        card = (
            <EmptyCard
                onClick={() => {
                    if (!disabled) {
                        setModalVisible(true);
                    }
                }}
            />
        );
    }

    return (
        <Fragment>
            {card}
            {isModalVisible && (
                <FavouriteMovieModal onClose={() => setModalVisible(false)} index={index} />
            )}
            {isRemoveDialogVisible && (
                <SimpleDialog
                    header="Удаление записи"
                    text="Вы уверены, что хотите удалить запись?"
                    onClose={toggleRemoveDialog}
                    onNegative={toggleRemoveDialog}
                    onPositive={onRemove}
                />
            )}
        </Fragment>
    );
};

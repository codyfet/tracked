import React, {Fragment, useState} from "react";
import {EmptyCard} from "./EmptyCard";
import {FavouriteMovieModal} from "./FavouriteMovieModal";
import {Icon, Image} from "semantic-ui-react";
import {IMAGE_URL} from "./../Consts";

/**
 * Компонент-карточка "Любимый фильм".
 */
export const FavouriteMovie = ({movie, index}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    let card;

    if (movie) {
        card = (
            <div className="favourite-movie-poster">
                <Icon
                    name='remove circle'
                    onClick={() => {console.log("removed!");}}
                    title="удалить"
                    className="remove-icon"
                />
                <Image
                    src={`${IMAGE_URL}/${movie.poster_path}`}
                    title={`${movie.title} (${new Date(movie.release_date).getFullYear()})`}
                />
            </div>
        );
    } else {
        card = <EmptyCard onClick={() => setModalVisible(true)} />;
    }

    return (
        <Fragment>
            {card}
            {isModalVisible && <FavouriteMovieModal onClose={() => setModalVisible(false)} index={index} />}
        </Fragment>
    );
};

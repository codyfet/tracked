import mongoose = require("mongoose");

export interface IFavouriteMovie {
    // id: number;
    title: string;
    release_date: string;
    poster_path: string;
    position: number;
}

/**
 * Модель, обогащенная mongoose функциональностями.
 */
export interface IFavouriteMovieDocument extends IFavouriteMovie, mongoose.Document {}

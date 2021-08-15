import mongoose = require("mongoose");

export interface IFavouriteMovie {
    // id: number;
    title: string;
    release_date: string;
    poster_path: string;
}

/**
 * Модель, обогащенная mongoose функциональностями.
 */
export interface IFavouriteMovieModel extends IFavouriteMovie, mongoose.Document {}

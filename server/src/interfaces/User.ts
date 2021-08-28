import mongoose = require("mongoose");

import {IRecord, IRecordModel} from "./Record";
import {IFavouriteMovie, IFavouriteMovieModel} from "./FavouriteMovie";

export interface IUser {
    // _id: string;
    email: string;
    password: string;
    username: string;
    favouriteMovies: IFavouriteMovie[];
    records: IRecord[];
    isAdmin: boolean;
}

/**
 * Модель, обогащенная mongoose функциональностями.
 */
export interface IUserModel extends IUser, mongoose.Document {
    records: IRecordModel[];
    favouriteMovies: IFavouriteMovieModel[];
}

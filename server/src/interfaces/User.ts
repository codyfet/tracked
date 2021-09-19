import mongoose = require("mongoose");

import {IRecord, IRecordDocument} from "./Record";
import {IFavouriteMovie, IFavouriteMovieDocument} from "./FavouriteMovie";

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
export interface IUserDocument extends IUser, mongoose.Document {
    records: IRecordDocument[];
    favouriteMovies: IFavouriteMovieDocument[];
}

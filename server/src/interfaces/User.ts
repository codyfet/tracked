import mongoose = require("mongoose");

import {IRecord, IRecordDocument} from "./Record";
import {IFavouriteMovie, IFavouriteMovieDocument} from "./FavouriteMovie";

export interface IUser {
    // _id: string;
    email: string;
    password: string;
    username: string;
    favouriteMovies: IFavouriteMovie[];
    records: IRecord[]; // TODO: Думаю, это лишнее - хранить здесь записи.
    isAdmin: boolean;
    image: string;
}

/**
 * Модель, обогащенная mongoose функциональностями.
 */
export interface IUserDocument extends IUser, mongoose.Document {
    records: IRecordDocument[];
    favouriteMovies: IFavouriteMovieDocument[];
}

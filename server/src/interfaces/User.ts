import {IRecord} from "./Record";
import {Document} from "mongoose";
import {IFavouriteMovie} from "./FavouriteMovie";

export interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    favouriteMovies: IFavouriteMovie[];
    records: IRecord[];
}
